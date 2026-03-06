export interface CatalogRoutine {
  slug: string
  title: string
  description: string
  version: number
  body: string
}

function withVersion(body: string, version: number): string {
  return `${body}\n\n<!-- centy-routine-version: ${version} -->`
}

export const catalog: CatalogRoutine[] = [
  {
    slug: 'sprint-planning',
    title: 'Sprint Planning',
    description: 'Structured sprint planning ceremony checklist',
    version: 1,
    body: withVersion(
      `# Sprint Planning

## Before the Meeting
- [ ] Product backlog is groomed and prioritized
- [ ] Previous sprint velocity is calculated
- [ ] Team availability for the sprint is confirmed

## During the Meeting
- [ ] Review sprint goal with the team
- [ ] Walk through top-priority backlog items
- [ ] Estimate and assign stories to the sprint
- [ ] Confirm sprint capacity matches planned work
- [ ] Identify dependencies and blockers

## After the Meeting
- [ ] Sprint backlog is finalized
- [ ] Sprint goal is documented and shared
- [ ] All stories have acceptance criteria`,
      1,
    ),
  },
  {
    slug: 'sprint-retrospective',
    title: 'Sprint Retrospective',
    description: 'End-of-sprint reflection and improvement process',
    version: 1,
    body: withVersion(
      `# Sprint Retrospective

## Preparation
- [ ] Gather sprint metrics (velocity, burndown, bugs)
- [ ] Collect feedback from team members async (optional)
- [ ] Review action items from previous retrospective

## Discussion
- [ ] What went well this sprint?
- [ ] What didn't go well?
- [ ] What can we improve?

## Action Items
- [ ] Identify 2-3 concrete improvements
- [ ] Assign owners to each action item
- [ ] Set deadlines for action items
- [ ] Document decisions and share with the team`,
      1,
    ),
  },
  {
    slug: 'deployment-checklist',
    title: 'Deployment Checklist',
    description: 'Pre- and post-deployment verification steps',
    version: 1,
    body: withVersion(
      `# Deployment Checklist

## Pre-Deployment
- [ ] All tests pass in CI
- [ ] Code has been reviewed and approved
- [ ] Database migrations are tested
- [ ] Environment variables and secrets are configured
- [ ] Rollback plan is documented

## Deployment
- [ ] Notify the team of deployment start
- [ ] Deploy to staging and verify
- [ ] Run smoke tests on staging
- [ ] Deploy to production
- [ ] Run smoke tests on production

## Post-Deployment
- [ ] Verify monitoring dashboards
- [ ] Check error rates and latency
- [ ] Confirm key user flows work end-to-end
- [ ] Notify the team of deployment completion
- [ ] Update deployment log`,
      1,
    ),
  },
  {
    slug: 'release-workflow',
    title: 'Release Workflow',
    description: 'Version release preparation and execution steps',
    version: 1,
    body: withVersion(
      `# Release Workflow

## Preparation
- [ ] Determine release version number
- [ ] Review all changes since last release
- [ ] Ensure all features are complete and tested
- [ ] Update changelog with new entries

## Release
- [ ] Create release branch
- [ ] Update version numbers in code
- [ ] Run full test suite
- [ ] Build release artifacts
- [ ] Tag the release in version control
- [ ] Publish release artifacts

## Communication
- [ ] Write release notes
- [ ] Notify stakeholders
- [ ] Update documentation if needed
- [ ] Close related issues and milestones`,
      1,
    ),
  },
  {
    slug: 'onboarding',
    title: 'Team Member Onboarding',
    description: 'New team member onboarding process',
    version: 1,
    body: withVersion(
      `# Team Member Onboarding

## Day 1 — Access & Setup
- [ ] Grant access to repositories and tools
- [ ] Set up development environment
- [ ] Add to communication channels (Slack, email, etc.)
- [ ] Share team wiki and documentation links

## Week 1 — Orientation
- [ ] Introduce to team members
- [ ] Walk through project architecture
- [ ] Review coding standards and conventions
- [ ] Assign a first small task or bug fix
- [ ] Schedule 1:1 with manager

## Week 2-4 — Ramp-Up
- [ ] Assign progressively larger tasks
- [ ] Review first pull requests together
- [ ] Introduce to deployment and release process
- [ ] Check in on blockers and questions

## 30-Day Check-In
- [ ] Gather feedback from new member
- [ ] Review onboarding experience
- [ ] Adjust workload and expectations`,
      1,
    ),
  },
  {
    slug: 'code-review',
    title: 'Code Review Checklist',
    description: 'Thorough code review process and criteria',
    version: 1,
    body: withVersion(
      `# Code Review Checklist

## Correctness
- [ ] Code does what the PR description says
- [ ] Edge cases are handled
- [ ] No obvious bugs or logic errors

## Quality
- [ ] Code is readable and well-structured
- [ ] No unnecessary duplication
- [ ] Functions and variables have clear names
- [ ] Complex logic has comments explaining why

## Security
- [ ] No hardcoded secrets or credentials
- [ ] User input is validated and sanitized
- [ ] No SQL injection, XSS, or other vulnerabilities

## Testing
- [ ] New code has appropriate tests
- [ ] Existing tests still pass
- [ ] Edge cases are covered in tests

## Performance
- [ ] No obvious performance regressions
- [ ] Database queries are efficient
- [ ] No unnecessary API calls or re-renders`,
      1,
    ),
  },
  {
    slug: 'incident-response',
    title: 'Incident Response',
    description: 'Steps for handling production incidents',
    version: 1,
    body: withVersion(
      `# Incident Response

## Detection & Triage
- [ ] Confirm the incident and assess severity
- [ ] Assign an incident lead
- [ ] Create an incident channel for communication
- [ ] Notify relevant stakeholders

## Investigation
- [ ] Check monitoring dashboards and logs
- [ ] Identify the root cause or likely cause
- [ ] Determine the blast radius (affected users/services)
- [ ] Document timeline of events

## Mitigation
- [ ] Implement a fix or workaround
- [ ] Verify the fix resolves the issue
- [ ] Monitor for recurrence
- [ ] Communicate resolution to stakeholders

## Post-Incident
- [ ] Write post-mortem document
- [ ] Identify action items to prevent recurrence
- [ ] Schedule post-mortem review meeting
- [ ] Update runbooks and documentation`,
      1,
    ),
  },
  {
    slug: 'bug-triage',
    title: 'Bug Triage',
    description: 'Process for evaluating and prioritizing bug reports',
    version: 1,
    body: withVersion(
      `# Bug Triage

## Initial Assessment
- [ ] Reproduce the bug
- [ ] Determine severity (critical, major, minor, cosmetic)
- [ ] Check if it's a duplicate of an existing report
- [ ] Identify affected versions and platforms

## Classification
- [ ] Assign priority based on severity and impact
- [ ] Categorize by component or area
- [ ] Estimate effort to fix
- [ ] Determine if it blocks a release

## Assignment
- [ ] Assign to appropriate team or developer
- [ ] Set target milestone or sprint
- [ ] Add relevant labels and tags
- [ ] Notify the reporter of triage outcome`,
      1,
    ),
  },
]
