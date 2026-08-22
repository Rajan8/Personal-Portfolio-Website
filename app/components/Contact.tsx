"use client";

import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/lib/content";
import { CopyButton } from "./CopyButton";
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  ExternalIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./Icons";
import { Section, SectionHead, Wrap } from "./Primitives";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Each rule states the cause and how to fix it, per field. */
function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Add your name so I know who's writing.";
  if (!values.email.trim()) errors.email = "Add an email address so I can reply.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That doesn't look like an email address — check for a typo.";
  if (!values.message.trim()) errors.message = "Tell me what you'd like to talk about.";
  else if (values.message.trim().length < 10)
    errors.message = "A little more detail helps — at least 10 characters.";
  return errors;
}

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
    copy: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    Icon: PhoneIcon,
    copy: true,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  { label: "Location", value: profile.location, Icon: MapPinIcon },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resume,
    Icon: DownloadIcon,
    external: true,
  },
] as const;

export function Contact() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function setField(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear an existing error as soon as the user fixes it, but never
    // introduce a new one mid-keystroke.
    if (errors[field]) {
      const next = validate({ ...values, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    }
  }

  function blurField(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (["name", "email", "message"] as FieldName[]).find((f) => next[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#field-${firstInvalid}`)?.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contact">
      <Wrap>
        <SectionHead
          eyebrow="Contact"
          title="Let's talk robots, teaching, or opportunities."
          lede="Open to internships, collaborations, and conversations about robotics education. Reach out directly, or use the form and it'll open in your mail app."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="mono-label text-[var(--ink-3)]">Direct channels</h3>
            <ul className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)]">
              {channels.map((channel, i) => {
                const { Icon } = channel;
                const external = "external" in channel && channel.external;
                return (
                  <li
                    key={channel.label}
                    className={`relative flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-[var(--accent-tint)] ${
                      i < channels.length - 1 ? "border-b border-[var(--line)]" : ""
                    }`}
                  >
                    <span aria-hidden className="shrink-0 text-[var(--ink-3)]">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mono-label block text-[var(--ink-3)]">{channel.label}</span>
                      {"href" in channel && channel.href ? (
                        <a
                          href={channel.href}
                          {...(external ? { target: "_blank", rel: "noopener" } : {})}
                          className="inline-flex items-center gap-1.5 break-all text-[0.9375rem] text-[var(--ink)] after:absolute after:inset-0 after:content-['']"
                        >
                          {channel.value}
                          {external ? (
                            <span aria-hidden className="text-[var(--ink-3)]">
                              <ExternalIcon />
                            </span>
                          ) : null}
                          {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                        </a>
                      ) : (
                        <span className="text-[0.9375rem] text-[var(--ink)]">{channel.value}</span>
                      )}
                    </span>
                    {"copy" in channel && channel.copy ? (
                      <CopyButton value={channel.value} label={channel.label} />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="mono-label text-[var(--ink-3)]">Send a message</h3>

            {sent ? (
              <div
                role="status"
                className="mt-4 flex items-start gap-3 rounded-[var(--radius-card)] border border-[var(--success)] bg-[var(--surface)] p-5"
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-[var(--success)]">
                  <CheckIcon size={18} />
                </span>
                <div>
                  <p className="font-medium text-[var(--ink)]">Your mail app should be open.</p>
                  <p className="mt-1 text-[0.9375rem] text-[var(--ink-2)]">
                    If nothing happened, email me directly at{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[var(--accent)] underline underline-offset-2"
                    >
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-3 cursor-pointer text-sm font-medium text-[var(--accent)] underline underline-offset-2"
                  >
                    Write another message
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-5">
                <Field
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  autoComplete="name"
                  value={values.name}
                  error={touched.name ? errors.name : undefined}
                  onChange={setField}
                  onBlur={blurField}
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={values.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={setField}
                  onBlur={blurField}
                />
                <Field
                  name="message"
                  label="Message"
                  textarea
                  placeholder="What would you like to talk about?"
                  value={values.message}
                  error={touched.message ? errors.message : undefined}
                  onChange={setField}
                  onBlur={blurField}
                />

                <button
                  type="submit"
                  className="group inline-flex min-h-[3rem] cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[var(--accent)] px-6 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-[var(--accent-hover)]"
                >
                  Send message
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRightIcon />
                  </span>
                </button>

                <p className="text-[0.8125rem] text-[var(--ink-3)]">
                  This opens a pre-filled draft in your own mail app — nothing is stored here.
                </p>
              </form>
            )}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

function Field({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  textarea = false,
  ...rest
}: {
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  onChange: (field: FieldName, value: string) => void;
  onBlur: (field: FieldName) => void;
  textarea?: boolean;
  type?: string;
  inputMode?: "email" | "text";
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    required: true,
    "aria-required": true,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(name, e.target.value),
    onBlur: () => onBlur(name),
    className: `w-full min-h-[3rem] rounded-lg border bg-[var(--surface)] px-3.5 py-3 text-[1rem] text-[var(--ink)] placeholder:text-[var(--ink-3)] transition-colors duration-200 focus:border-[var(--accent)] ${
      error ? "border-[var(--danger)]" : "border-[var(--line-strong)]"
    }`,
    ...rest,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mono-label mb-2 block text-[var(--ink-3)]"
      >
        {label}
        <span aria-hidden className="ml-1 text-[var(--danger)]">
          *
        </span>
        <span className="sr-only"> (required)</span>
      </label>

      {textarea ? (
        <textarea {...shared} rows={5} className={`${shared.className} resize-y`} />
      ) : (
        <input {...shared} />
      )}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-[var(--danger)]"
        >
          <span aria-hidden className="shrink-0">
            <AlertIcon />
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
