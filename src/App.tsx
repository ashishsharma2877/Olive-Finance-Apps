import { useState } from 'react'
import TabNav from './components/TabNav'
import PlayerEngagement from './components/PlayerEngagement'
import PlayerMonetization from './components/PlayerMonetization'
import BudgetVsActuals from './components/BudgetVsActuals'
import TopVarianceDrivers from './components/TopVarianceDrivers'
import ForecastAccuracy from './components/ForecastAccuracy'
import ScenarioPlanning from './components/ScenarioPlanning'
import './App.css'

const TABS = [
  'Player Engagement',
  'Player Monetization',
  'Budget vs Actuals',
  'Top Variance Drivers',
  'Forecast Accuracy',
  'Scenario Planning',
]

function App() {
  const [selectedTab, setSelectedTab] = useState(TABS[0])

  let TabContent = null
  switch (selectedTab) {
    case 'Player Engagement':
      TabContent = <PlayerEngagement />
      break
    case 'Player Monetization':
      TabContent = <PlayerMonetization />
      break
    case 'Budget vs Actuals':
      TabContent = <BudgetVsActuals />
      break
    case 'Top Variance Drivers':
      TabContent = <TopVarianceDrivers />
      break
    case 'Forecast Accuracy':
      TabContent = <ForecastAccuracy />
      break
    case 'Scenario Planning':
      TabContent = <ScenarioPlanning />
      break
    default:
      TabContent = null
  }

  return (
    <div className="App" style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <h1 style={{ marginBottom: 0 }}>OLIVE  ANALYTICS</h1>
      <TabNav tabs={TABS} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <div style={{ marginTop: 32 }}>{TabContent}</div>
    </div>
  )
}

export default App
