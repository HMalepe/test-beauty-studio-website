import { useId, useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'How much does it cost?',
    answer: 'Tinker is completely free to download and use. All the creative tools and AI features are available at no cost.',
  },
  {
    question: 'How do I sign up?',
    answer: 'Download Tinker from the App Store or Google Play, then create an account with your email or sign in with your existing Shopify account.',
  },
  {
    question: 'Which devices work with Tinker?',
    answer: 'Tinker is available on iOS devices running iOS 15 or later, and Android devices running Android 10 or later. We recommend using the latest version of your operating system for the best experience.',
  },
  {
    question: 'Can I share my projects?',
    answer: 'Yes! You can share your creations directly from the app to social media, or export them to your device to share anywhere you like.',
  },
  {
    question: 'What about privacy?',
    answer: 'Your privacy is important to us. Your projects and data are stored securely, and we never share your personal information with third parties without your consent.',
  },
] as const

function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className="border-b border-neutral-200">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="text-xl font-[550] text-ink">{question}</span>
        <span
          className={`flex size-8 shrink-0 items-center justify-center text-2xl font-light leading-none text-ink transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className={`pb-6 pr-4 text-base leading-relaxed text-neutral-700 transition-opacity duration-300 motion-reduce:transition-none ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({})

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <section id="faq" className="bg-paper px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="text-2xl font-[550] text-ink md:text-3xl">Questions? Answered.</h2>
        </div>
        <div className="border-t border-neutral-200">
          {FAQ_ITEMS.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={Boolean(openItems[index])}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
