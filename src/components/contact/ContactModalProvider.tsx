import { ContactModal } from '#/components/contact/ContactModal'
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
  const [isOpen, setIsOpen] = useState(false)

  const openContactModal = useCallback(() => setIsOpen(true), [])
  const closeContactModal = useCallback(() => setIsOpen(false), [])

  return (
    <ContactModalContext.Provider
      value={{ openContactModal, closeContactModal }}
    >
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContactModal} />
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
