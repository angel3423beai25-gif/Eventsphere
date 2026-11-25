import { useState } from 'react';

// Simple FAQ accordion: local useState decides which item is open.
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="accordion">
      {items.map(([q, a], i) => (
        <div key={q} className={`accordion-item${openIndex === i ? ' open' : ''}`}>
          <button type="button" aria-expanded={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
            {q}<span aria-hidden="true">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && <p>{a}</p>}
        </div>
      ))}
    </div>
  );
}
