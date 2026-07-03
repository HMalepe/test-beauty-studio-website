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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <PinnedScene />
        <ToolsGrid />
        <InTheWild />
        <PlayToLearn />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default App
