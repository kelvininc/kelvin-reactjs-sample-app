# Branching

Since the beginning of 2020 the frontend is using in all of its repositories the next branch ideology:

* __dev__ for development.  The main branch where development is done. All feature breaches start from this branch.

* __master__ is the branch from which software is released to production. Only production-ready code can be committed to this branch. All commits are tagged since they represent releases.

* __alpha, beta__ is used for tests and development purposes.

The other non-permanent branches are

1. Feature branches – Feature branches are used to develop new features. Feature branches will be eventually merged back into the development branch. Each feature branch is as small as possible.

1. Hotfix/Patch branches – Hotfixes are production issues that need an immediate fix before a planned release. The development team creates a hotfix branch from the deployed production tag (usually the same name as the current deployed version) and applies the appropriate fixes. Don't forget to apply the hotfix on the current development branch.



