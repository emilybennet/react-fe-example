# BandTickets Anonymous

An example UI built with React and Tailwind, scaffolded using Create React App.

## Code + demo

The code for this project can be found on GitHub at [https://github.com/emilybennet/react-fe-example](https://github.com/emilybennet/react-fe-example), and a live demo is available via GitHub Pages at [https://emilybennet.github.io/react-fe-example/](https://emilybennet.github.io/react-fe-example/).

## To hack on it

1. Clone the GitHub repo.
2. Install dependencies via `npm install`.
3. Start the development server with `npm start`.
4. Band JSON files live in `./src/band-json` and are manually set in `./src/App.tsx`.
5. Happy hacking! 😊

## Considerations

With both time and Create React App (CRA) constraints, I opted for basic state management via React’s `useState` hook and [Tailwind CSS](https://tailwindcss.com/) for styling.

Personally, I’ve always liked CSS-in-JS for colocating styles with components. But with [Styled Components entering maintenance mode](https://opencollective.com/styled-components/updates/thank-you) and the many benefits of utility-first styling (smaller builds, reduced duplication, shared language), Tailwind has become my default — though [Yak](https://yak.js.org/) looks like a promising future-friendly alternative. 👀

### Future enhancements

1. **Automated testing.** Unit tests were next on my list before time ran out 😅 — but they’re essential for long-term stability.
2. **Migrate off CRA.** [CRA was officially deprecated](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) in Feb 2025. Additionally, some of CRA's legacy dependencies introduce downstream version conflicts and potential vulnerabilities, which can make long-term maintenance and tooling upgrades more difficult. Migrating to [Vite](https://vite.dev/) or [Next.js](https://nextjs.org/) (depending on the app’s scope) would offer more flexibility and modern tooling.
3. **Improved form validation.** Right now, validation relies on basic HTML attributes. That works, but for consistency across browsers and better dev ergonomics, a combo like [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) would be ideal.
4. **Input masking.** Fields like credit card number and expiry could be more intuitive. We could handle formatting manually or explore libraries like [Cleave.js](https://www.npmjs.com/package/cleave.js) or [imask](https://imask.js.org/).
5. **Internationalization (i18n).** To serve a broader audience, we could integrate translation support. [i18next](https://www.i18next.com/) is a popular and flexible option for React apps.
6. **Custom quantity stepper.** The current number input works fine (and is accessible), but it doesn’t fully match the mock. A custom control with always-visible +/- buttons would better match the spec and UX expectations.

## Thanks! 🫶

Thanks so much for taking the time to get to know me and for reviewing this project!
