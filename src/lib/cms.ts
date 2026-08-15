/* ---------------------------------------------------------------------------
   Structured CMS.

   The previous site stored the ENTIRE innerHTML of #site-content as one string
   in Firestore and re-injected it on every load. A single bad edit could
   silently replace the whole design, and the repo and the live site drifted
   apart (they had, by about two months).

   This replaces that with a typed content document. Admins edit fields; the
   layout is code and cannot be edited away. SCHEMA_VERSION gates loading, so a
   document written by an older or incompatible editor is ignored, not applied.
   --------------------------------------------------------------------------- */
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore, doc, getDoc, setDoc, serverTimestamp, type Firestore,
} from 'firebase/firestore';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged, type Auth, type User,
} from 'firebase/auth';

import { members as seedMembers, coaches as seedCoaches, captain as seedCaptain } from '@/data/team';
import { sponsors as seedSponsors } from '@/data/sponsors';
import { awards as seedAwards, specs as seedSpecs } from '@/data/site';
import { outreach as seedOutreach, RELATIVE_ONLY } from '@/data/outreach';

export const SCHEMA_VERSION = 2;
const COLLECTION = 'siteContent';
const DOC = 'structured-v2';

const firebaseConfig = {
  apiKey: 'AIzaSyCpjYZZ5ewUBuysfDa-zj9NG4UpyycpM3U',
  authDomain: 'sharp-face-robotics-website.firebaseapp.com',
  projectId: 'sharp-face-robotics-website',
  storageBucket: 'sharp-face-robotics-website.firebasestorage.app',
  messagingSenderId: '721099167616',
  appId: '1:721099167616:web:b12b9b9349878a0fae5365',
};

export type SiteContent = {
  schemaVersion: number;
  members: typeof seedMembers;
  coaches: typeof seedCoaches;
  captain: typeof seedCaptain;
  sponsors: typeof seedSponsors;
  awards: typeof seedAwards;
  specs: typeof seedSpecs;
  outreach: typeof seedOutreach;
  relativeOnly: boolean;
  updatedBy?: string;
};

/** The shipped content — always a valid, complete document. */
export const seed: SiteContent = {
  schemaVersion: SCHEMA_VERSION,
  members: seedMembers,
  coaches: seedCoaches,
  captain: seedCaptain,
  sponsors: seedSponsors,
  awards: seedAwards,
  specs: seedSpecs,
  outreach: seedOutreach,
  relativeOnly: RELATIVE_ONLY,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

function init() {
  if (app) return;
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}

/** Shallow-merge a stored doc over the seed, keeping only known, correctly-shaped keys. */
function merge(stored: Partial<SiteContent>): SiteContent {
  const out: SiteContent = { ...seed };
  (Object.keys(seed) as (keyof SiteContent)[]).forEach(k => {
    const v = stored[k];
    if (v === undefined || v === null) return;
    if (Array.isArray(seed[k]) !== Array.isArray(v)) return; // shape guard
    (out as Record<string, unknown>)[k] = v;
  });
  out.schemaVersion = SCHEMA_VERSION;
  return out;
}

export async function loadContent(): Promise<SiteContent> {
  try {
    init();
    const snap = await getDoc(doc(db!, COLLECTION, DOC));
    if (!snap.exists()) return seed;
    const data = snap.data() as Partial<SiteContent>;

    // Version gate: never apply a document this build does not understand.
    if (data.schemaVersion !== SCHEMA_VERSION) {
      console.info(`[cms] ignoring stored content (schema v${data.schemaVersion ?? '?'}, expected v${SCHEMA_VERSION})`);
      return seed;
    }
    return merge(data);
  } catch (err) {
    console.warn('[cms] load failed, using shipped content', err);
    return seed;
  }
}

export async function saveContent(content: SiteContent, user: User) {
  init();
  await setDoc(doc(db!, COLLECTION, DOC), {
    ...content,
    schemaVersion: SCHEMA_VERSION,
    updatedBy: user.email ?? user.uid,
    updatedAt: serverTimestamp(),
  });
}

export function watchAuth(cb: (u: User | null) => void) {
  init();
  return onAuthStateChanged(auth!, cb);
}

export async function signIn() {
  init();
  return signInWithPopup(auth!, new GoogleAuthProvider());
}

export async function signOutAdmin() {
  init();
  return signOut(auth!);
}
