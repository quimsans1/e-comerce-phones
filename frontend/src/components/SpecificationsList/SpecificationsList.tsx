import './SpecificationsList.scss'

export interface SpecificationItem {
  label: string
  value: string | number | null | undefined
}

interface SpecificationsListProps {
  items: SpecificationItem[]
}

export const SpecificationsList = ({ items }: SpecificationsListProps) => {
  return (
    <>
      <div className="specifications-list-divider" aria-hidden="true" />
      {items.map((item) => (
        <div key={item.label} className="specifications-list-item">
          <div className="specifications-list-row">
            <span className="specifications-list-label">{item.label}</span>
            <div className="specifications-list-value-wrapper">
              <span className="specifications-list-value">{item.value ?? ''}</span>
            </div>
          </div>
          <div className="specifications-list-divider" aria-hidden="true" />
        </div>
      ))}
    </>
  )
}