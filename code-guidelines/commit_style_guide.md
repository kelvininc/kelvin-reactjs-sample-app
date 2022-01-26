# Commit Style Guide
> **Based of** [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) 
## Summary

The Conventional Commits specification is a lightweight convention on top of commit messages.
It provides an easy set of rules for creating an explicit commit history,
which makes it easier to write automated tools on top of.
This convention dovetails with [SemVer](http://semver.org),
by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

```
<type>[optional scope]: <description> [<optional jira ticket>]

[optional body]

[optional footer(s)]
```

---

The commit contains the following structural elements, to communicate intent to the
consumers of your library:

1. **fix:** a commit of the _type_ `fix` patches a bug in your codebase (this correlates with [`PATCH`](http://semver.org/#summary) in semantic versioning).
1. **feat:** a commit of the _type_ `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](http://semver.org/#summary) in semantic versioning).
1. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with [`MAJOR`](http://semver.org/#summary) in semantic versioning).
A BREAKING CHANGE can be part of commits of any _type_.
1. _types_ other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`,
  `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
1. _footers_ other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to
  [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Additional types are not mandated by the conventional commits specification and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).


A scope may be provided to a commit's type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add the ability to parse arrays`.

## Examples

__Commit message with the description and breaking change footer__
```
feat: update ACP and Workload classes [S3-123]

BREAKING CHANGE: 
ACP now requires a name and system info when created
```

__Commit message with `!` to draw attention to breaking change__
```
refactor!: drop support for Angular 7 [S4-124]
```

__Commit message with both `!` and BREAKING CHANGE footer__
```
feat!: update kv-table to support drag and drop [S3-125]

BREAKING CHANGE: 
kv-table now requires a listHeaders array to be able to render columns
```

__Commit message with no body__
```
docs: update README.md with new build process [S4-126]
```

__Commit message with scope__
```
build(jenkins): add semantic-release step for master branch [S4-127]
```

__Commit message with no Jira ticket__
```
chore: update peerDependencies to support Angular 8 apps
```

__Commit message with multi-paragraph body and multiple footers__
```
fix(kv-search): add debouncer to prevent multiple requests on search click [S3-128]

kv-search now triggers changes with a 500ms debounce.

Fix related to S3-122.
```

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Commits MUST be prefixed with a type, which consists of a noun, `feat`, `fix`, etc., followed
  by the OPTIONAL scope, OPTIONAL `!`, and REQUIRED terminal colon and space.
1. The type `feat` MUST be used when a commit adds a new feature to your application or library.
1. The type `fix` MUST be used when a commit represents a bug fix for your application.
1. A scope MAY be provided after a type. A scope MUST consist of a noun describing a
  section of the codebase surrounded by parenthesis, e.g., `fix(parser):`
1. A description MUST immediately follow the colon and space after the type/scope prefix.
The description is a short summary of the code changes, e.g., _fix: array parsing issue when multiple spaces were contained in string_.
1. A Jira ticket SHOULD be provided after the description and placed between brackets after, e.g., _refactor: drop support for Angular 7 [KMDLIB-124]_.
1. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
1. A commit body is free-form and MAY consist of any number of newline-separated paragraphs.
1. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of
 a word token, followed by either a `:<space>` or `<space>#` separator, followed by a string value (this is inspired by the
  [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)).
1. A footer's token MUST use `-` in place of whitespace characters, e.g., `Acked-by` (this helps differentiate
  the footer section from a multi-paragraph body). An exception is made for `BREAKING CHANGE`, which MAY also be used as a token.
1. A footer's value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer
  token/separator pair is observed.
1. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the
  footer.
1. If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description, e.g.,
_BREAKING CHANGE: environment variables now take precedence over config files_.
1. If included in the type/scope prefix, breaking changes MUST be indicated by a
  `!` immediately before the `:`. If `!` is used, `BREAKING CHANGE:` MAY be omitted from the footer section,
  and the commit description SHALL be used to describe the breaking change.
1. Types other than `feat` and `fix` MAY be used in your commit messages, e.g., _docs: updated ref docs._
1. The units of information that make up conventional commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
1. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE when used as a token in a footer.


## Commit types

```
* feat: A new feature

* fix: A bug fix

* docs: Documentation only changes

* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

* refactor: A code change that neither fixes a bug nor adds a feature

* perf: A code change that improves performance

* test: Adding missing tests or correcting existing tests

* build: Changes that affect the build system or external dependencies (example scopes: gulp, npm, etc.)

* ci: Changes to our CI configuration files and scripts (example scopes: Jenkins, etc.)

* chore: Other changes that don't modify src or test files

* revert: Reverts a previous commit
```

## Why Use Conventional Commits

* Automatically generating CHANGELOGs.
* Automatically determining a semantic version bump (based on the types of commits landed).
* Communicating the nature of changes to teammates, the public, and other stakeholders.
* Triggering build and publish processes.
* Making it easier for people to contribute to your projects, by allowing them to explore
  a more structured commit history.

## FAQ

__How should I deal with commit messages in the initial development phase?__

We recommend that you proceed as if you've already released the product. Typically *somebody*, even if it's your fellow software developers, is using your software. They'll want to know what's fixed, what breaks etc.

__Are the types in the commit title uppercase or lowercase?__

Any casing may be used, but it's best to be consistent.

__What do I do if the commit conforms to more than one of the commit types?__

Go back and make multiple commits whenever possible. Part of the benefit of Conventional Commits is its ability to drive us to make more organized commits and PRs.

__Doesn't this discourage rapid development and fast iteration?__

It discourages moving fast in a disorganized way. It helps you be able to move fast long term across multiple projects with varied contributors.

__Might Conventional Commits lead developers to limit the type of commits they make because they'll be thinking in the types provided?__

Conventional Commits encourages us to make more of certain types of commits such as fixes. Other than that, the flexibility of Conventional Commits allows your team to come up with their own types and change those types over time.

__How does this relate to SemVer?__

`fix` type commits should be translated to `PATCH` releases. `feat` type commits should be translated to `MINOR` releases. Commits with `BREAKING CHANGE` in the commits, regardless of type, should be translated to `MAJOR` releases.

__What do I do if I accidentally use the wrong commit type?__

__When you used a type that's of the spec but not the correct type, e.g. `fix` instead of `feat`__

Prior to merging or releasing the mistake, we recommend using `git rebase -i` to edit the commit history. After release, the cleanup will be different according to what tools and processes you use.

__When you used a type *not* of the spec, e.g. `feet` instead of `feat`__

In a worst-case scenario, it's not the end of the world if a commit lands that does not meet the conventional commit specification. It simply means that commit will be missed by tools that are based on the spec.

__How does Conventional Commits handle revert commits?__

Reverting code can be complicated: are you reverting multiple commits? if you revert a feature, should the next release instead be a patch?

Conventional Commits does not make an explicit effort to define revert behavior. Instead we leave it to tooling
authors to use the flexibility of _types_ and _footers_ to develop their logic for handling reverts.

One recommendation is to use the `revert` type, and a footer that references the commit SHAs that are being reverted:

```
revert: bad implementation of search [KWEB-128]

Refs: 676104e, a215868
```

## About

The Conventional Commit specification is inspired by, and based heavily on, the [Angular Commit Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

The first draft of this specification has been written in collaboration with some of the folks contributing to:

* [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog): a set of tools for parsing conventional commit messages from git histories.
* [bumped](https://bumped.github.io): a tool for releasing software that makes it easy to perform actions before and after releasing a new version of your software.
* [unleash](https://github.com/netflix/unleash): a tool for automating the software release and publishing lifecycle.
* [lerna](https://github.com/lerna/lerna): a tool for managing mono repo, which grew out of the Babel project.


