import type { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  title: string
  subtitle?: string
}

export const Card = ({ title, subtitle, children }: CardProps) => {
  return (
    <article className="card">
      <header className="card__header">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      {children}
    </article>
  )
}
