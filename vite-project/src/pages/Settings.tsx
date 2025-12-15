import { useStore } from '@tanstack/react-store'
import { appStore, setTheme, setSidebarFixed } from '../store/appStore'

export default function Settings() {
  const theme = useStore(appStore, (s) => s.theme)
  const sidebarFixed = useStore(appStore, (s) => s.sidebarFixed)

  return (
    <div className="page settings">
      <h2>Settings</h2>

      <div className="setting">
        <label>
          <span>Theme</span>
          <select value={theme} onChange={(e: any) => setTheme(e.target.value as any)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div className="setting">
        <label>
          <span>Sidebar fijo</span>
          <input type="checkbox" checked={sidebarFixed} onChange={(e: any) => setSidebarFixed(e.target.checked)} />
        </label>
      </div>
    </div>
  )
}
