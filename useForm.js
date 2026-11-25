import { useState } from 'react';

/**
 * Small controlled-form hook.
 * - values live in state (controlled inputs)
 * - errors are DERIVED from values via validate(), so they never go stale
 * - an error shows only after the field was touched (blur) or the form was submitted
 */
export default function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allErrors = validate(values);

  const field = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true }))
  });

  const error = (name) => ((touched[name] || submitted) && allErrors[name]) || '';
  const reset = () => { setValues(initialValues); setTouched({}); setSubmitted(false); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(allErrors).length === 0) onSubmit(values, { reset });
  };

  return { values, field, error, handleSubmit, reset, isValid: Object.keys(allErrors).length === 0 };
}
