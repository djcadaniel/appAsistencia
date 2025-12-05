import { DashboardProvider } from "./context/AppContext"
import { AppRoutes } from "./routes/AppRoutes"

function App() {

  return (
    <DashboardProvider>
      <AppRoutes />
    </DashboardProvider>
  )
}

export default App
