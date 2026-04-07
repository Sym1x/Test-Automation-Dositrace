## E2E UI Testing automation with Cucumber & Playwright for DOSITRACE

# To start contributing
1. `git clone <repo-link>`
2. **Create .env inside /environment, accordingly with how env-wrapper.js exposes its variables. Or simply:**
   `>cp .env.example .env`
   And change.
3. **Use either of the two scripts defined in package.json (npm run test / npm run fulltest); *npm run test* only executes steps from scenarios tagged with @testing, whereas *npm run fulltest* executes all scenarios**
```text
project-root/
├── environment/
│   ├── .env
│   └── env-wrapper.js
│
├── support/
│   ├── hooks.js
│   │   └── (Cucumber hooks)
│   └── world.js
│       └── (Cucumber's World definition)
│
├── page-objects/
│   ├── LoginPage.js
│   └── DashboardPage.js
│
├── features/
│   ├── *.feature        # Gherkin feature files
│   └── login.feature
│
└── step-definitions/
    ├── *.js             # Step implementations of scenarios from each feature
    └── login.steps.js
