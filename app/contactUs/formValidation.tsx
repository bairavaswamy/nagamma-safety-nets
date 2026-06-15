const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[#111827] placeholder-slate-400 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20";

const ContactForm = () => {
  return (
    <div className="text-[#475569]">
      <h2 className="mb-6 text-center text-2xl font-bold text-[#111827]">
        Send Us a Message
      </h2>

      <form className="space-y-5">
        <div>
          <label className="mb-1 block font-medium text-[#334155]">
            Full Name
          </label>
          <input type="text" placeholder="Your Name" className={fieldClass} />
        </div>

        <div>
          <label className="mb-1 block font-medium text-[#334155]">
            Email
          </label>
          <input type="email" placeholder="Your Email" className={fieldClass} />
        </div>

        <div>
          <label className="mb-1 block font-medium text-[#334155]">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Your Phone Number"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-[#334155]">
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Write your message here..."
            className={fieldClass}
          />
        </div>

        <button
          type="button"
          className="min-h-[44px] w-full rounded-lg bg-[#C2410C] py-3 font-bold text-white shadow-sm transition hover:bg-[#9A3412]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
