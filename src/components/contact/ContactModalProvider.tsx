import { ContactModal } from '#/components/contact/ContactModal'
import { isCurriculumMode } from '#/lib/site-mode'
import { createContext, useCallback, useContext, useState } from 'react'

interface ContactModalContextValue {
  openContactModal: () => void
  closeContactModal: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const curriculumMode = isCurriculumMode()
  const [isOpen, setIsOpen] = useState(false)

  const openContactModal = useCallback(() => {
    if (!curriculumMode) {
      setIsOpen(true)
    }
  }, [curriculumMode])
  const closeContactModal = useCallback(() => setIsOpen(false), [])

  return (
    <ContactModalContext.Provider
      value={{ openContactModal, closeContactModal }}
    >
      {children}
      {!curriculumMode && (
        <ContactModal isOpen={isOpen} onClose={closeContactModal} />
      )}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider')
  }
  return context
}
