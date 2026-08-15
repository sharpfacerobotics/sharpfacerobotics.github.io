import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { seed, saveContent, signIn, signOutAdmin, watchAuth, SCHEMA_VERSION, type SiteContent } from '@/lib/cms';
import './Admin.css';

/* A forms-based editor over the typed content document.
   Deliberately not contentEditable — the layout is not editable, only the data. */
export default function Admin({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [draft, setDraft] = useState<SiteContent>(seed);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => watchAuth(setUser), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const save = async () => {
    if (!user) return;
    setBusy(true);
    setStatus('Saving…');
    try {
      await saveContent(draft, user);
      setStatus('Saved. Reload to see it applied.');
    } catch (e) {
      setStatus(`Save failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const setMember = (i: number, patch: Partial<SiteContent['members'][number]>) =>
    setDraft(d => ({ ...d, members: d.members.map((m, j) => (j === i ? { ...m, ...patch } : m)) }));

  const setSponsor = (i: number, patch: Partial<SiteContent['sponsors'][number]>) =>
    setDraft(d => ({ ...d, sponsors: d.sponsors.map((s, j) => (j === i ? { ...s, ...patch } : s)) }));

  return (
    <div className="admin" role="dialog" aria-modal="true" aria-label="Site admin">
      <div className="admin__scrim" onClick={onClose} />
      <div className="admin__panel">
        <header className="admin__head">
          <div>
            <h2 className="d3">Site content</h2>
            <p className="mono-sm">Schema v{SCHEMA_VERSION} · structured fields, not raw HTML</p>
          </div>
          <button className="admin__x" onClick={onClose} aria-label="Close">✕</button>
        </header>

        {!user ? (
          <div className="admin__auth">
            <p>Sign in with the team Google account to edit content.</p>
            <button className="btn btn--solid" onClick={() => signIn().catch(e => setStatus(e.message))}>
              Sign in with Google
            </button>
            {status && <p className="mono-sm admin__status">{status}</p>}
          </div>
        ) : (
          <>
            <div className="admin__who mono-sm">
              <span>{user.email}</span>
              <button onClick={() => signOutAdmin()}>Sign out</button>
            </div>

            <div className="admin__body">
              <section>
                <h3 className="mono admin__legend">Roster</h3>
                {draft.members.map((m, i) => (
                  <div className="admin__row" key={m.name + i}>
                    <input aria-label="Name" value={m.name} onChange={e => setMember(i, { name: e.target.value })} />
                    <select aria-label="Group" value={m.group} onChange={e => setMember(i, { group: e.target.value as 'Mechanical' | 'Software' })}>
                      <option>Mechanical</option>
                      <option>Software</option>
                    </select>
                    <input aria-label="Grade" value={m.grade} onChange={e => setMember(i, { grade: e.target.value })} />
                    <input aria-label="Favourite part" value={m.favorite} onChange={e => setMember(i, { favorite: e.target.value })} />
                  </div>
                ))}
              </section>

              <section>
                <h3 className="mono admin__legend">Partners</h3>
                {draft.sponsors.map((s, i) => (
                  <div className="admin__row admin__row--sp" key={s.name}>
                    <span className="admin__spname">{s.name}</span>
                    <input
                      aria-label={`${s.name} note`}
                      placeholder="What this partnership provides"
                      value={s.note ?? ''}
                      onChange={e => setSponsor(i, { note: e.target.value || null })}
                    />
                  </div>
                ))}
              </section>

              <section>
                <h3 className="mono admin__legend">Outreach chart</h3>
                <label className="admin__check">
                  <input
                    type="checkbox"
                    checked={draft.relativeOnly}
                    onChange={e => setDraft(d => ({ ...d, relativeOnly: e.target.checked }))}
                  />
                  <span>Relative shape only — publish no figures (recommended until real numbers exist)</span>
                </label>
              </section>
            </div>

            <footer className="admin__foot">
              {status && <span className="mono-sm admin__status">{status}</span>}
              <button className="btn" onClick={onClose}>Cancel</button>
              <button className="btn btn--solid" onClick={save} disabled={busy}>
                {busy ? 'Saving…' : 'Save to Firestore'}
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
