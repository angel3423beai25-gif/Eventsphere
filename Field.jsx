/** Label + input + validation message. `form` is the object returned by useForm. */
export default function Field({ label, form, name, as: Tag = 'input', children, hint, ...rest }) {
  const error = form.error(name);
  return (
    <div className="form-row">
      <label htmlFor={name}>{label}</label>
      <Tag id={name} {...form.field(name)} aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined} {...rest}>
        {children}
      </Tag>
      {hint}
      <span className="field-error" id={`${name}-error`}>{error}</span>
    </div>
  );
}
