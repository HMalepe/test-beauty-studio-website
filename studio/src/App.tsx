import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { InTheWild } from './components/InTheWild'
import { Nav } from './components/Nav'
import { PinnedScene } from './components/PinnedScene'
import { PlayToLearn } from './components/PlayToLearn'
import { ToolsGrid } from './components/ToolsGrid'

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <PinnedScene />
      <ToolsGrid />
      <InTheWild />
      <PlayToLearn />
      <Faq />
      <Footer />
    </>
  )
}

export default App
