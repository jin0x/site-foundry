import {
  BaseBlock,
  Button,
  Container,
  Grid,
  Heading,
  Section,
  SectionCta,
  SectionHeading,
  Stack,
  Text,
} from '@site-foundry-template/ui';
import type {
  BackgroundTone,
  SpacingSize,
  Alignment,
} from '@site-foundry-template/sanity-types';
import type { HeadingSize } from '@site-foundry-template/ui';

const TONES: BackgroundTone[] = ['none', 'subtle', 'accent', 'inverse'];
const SPACINGS: SpacingSize[] = ['compact', 'default', 'roomy'];
const ALIGNMENTS: Alignment[] = ['left', 'center'];
const HEADING_SIZES: HeadingSize[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function DemoHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" size="h2" className="border-b border-white/10 pb-2">
      {children}
    </Heading>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text size="caption" color="muted" className="uppercase tracking-widest">
      {children}
    </Text>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/5 p-4 text-sm">{children}</div>
  );
}

export default function ComponentsPage() {
  return (
    <main className="py-16">
      <Container size="lg">
        <Stack gap="2xl">
          <header>
            <Heading as="h1" size="h1">
              Components — dev catalog
            </Heading>
            <Text size="base" color="muted" className="mt-2">
              Section / SectionHeading / SectionCta / BaseBlock variants.
            </Text>
          </header>

          {/* ---------- Section ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>Section</DemoHeading>

              <Stack gap="md">
                <Label>backgroundTone variants (spacing=&quot;compact&quot;)</Label>
                {TONES.map((tone) => (
                  <Stack key={tone} gap="xs">
                    <Label>backgroundTone=&quot;{tone}&quot;</Label>
                    <Section backgroundTone={tone} spacing="compact">
                      <Text size="base">
                        Sample section content — tone “{tone}”, spacing “compact”.
                      </Text>
                    </Section>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>spacing variants (tone=&quot;subtle&quot;)</Label>
                {SPACINGS.map((spacing) => (
                  <Stack key={spacing} gap="xs">
                    <Label>spacing=&quot;{spacing}&quot;</Label>
                    <Section backgroundTone="subtle" spacing={spacing}>
                      <Text size="base">
                        Sample section content — spacing “{spacing}”.
                      </Text>
                    </Section>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </section>

          {/* ---------- SectionHeading ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>SectionHeading</DemoHeading>

              <Stack gap="md">
                <Label>full (eyebrow + heading + subheading) × align</Label>
                {ALIGNMENTS.map((align) => (
                  <Stack key={align} gap="xs">
                    <Label>align=&quot;{align}&quot;</Label>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                      <SectionHeading
                        eyebrow="Platform"
                        heading="Build faster with the design system"
                        subheading="A composable kit of primitives and components, wired to the Site Foundry tokens."
                        align={align}
                      />
                    </div>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>heading-only × headingSize</Label>
                {HEADING_SIZES.map((size) => (
                  <Stack key={size} gap="xs">
                    <Label>headingSize=&quot;{size}&quot;</Label>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                      <SectionHeading heading={`SectionHeading size ${size}`} headingSize={size} />
                    </div>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>subheading-only (ReactNode slot) × align</Label>
                {ALIGNMENTS.map((align) => (
                  <Stack key={align} gap="xs">
                    <Label>align=&quot;{align}&quot;</Label>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                      <SectionHeading
                        align={align}
                        subheading={
                          <p>
                            Standalone subheading — useful when the block above already handled the
                            heading.
                          </p>
                        }
                      />
                    </div>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>empty (all undefined) — returns null</Label>
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-6 text-[var(--color-tertiary)]">
                  <SectionHeading />
                  <em>(no output — SectionHeading returned null)</em>
                </div>
              </Stack>
            </Stack>
          </section>

          {/* ---------- SectionCta ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>SectionCta</DemoHeading>

              <Stack gap="md">
                <Label>single CTA × align</Label>
                {ALIGNMENTS.map((align) => (
                  <Stack key={align} gap="xs">
                    <Label>align=&quot;{align}&quot;</Label>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                      <SectionCta align={align}>
                        <Button>Get started</Button>
                      </SectionCta>
                    </div>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>two CTAs × align</Label>
                {ALIGNMENTS.map((align) => (
                  <Stack key={align} gap="xs">
                    <Label>align=&quot;{align}&quot;</Label>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                      <SectionCta align={align}>
                        <Button color="primary">Primary action</Button>
                        <Button variant="outline" color="primary">
                          Secondary
                        </Button>
                      </SectionCta>
                    </div>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </section>

          {/* ---------- BaseBlock ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>BaseBlock</DemoHeading>

              <Stack gap="md">
                <Label>full composition (block metadata + sectionHeading + children)</Label>
                <BaseBlock
                  block={{
                    spacing: 'compact',
                    backgroundTone: 'subtle',
                    sectionHeading: {
                      enabled: true,
                      eyebrow: 'Sample',
                      heading: 'BaseBlock renders a full block shell',
                      subheading: null,
                      align: 'left',
                    },
                  }}
                >
                  <Grid cols={3} gap="sm">
                    <Tile>Cell 1</Tile>
                    <Tile>Cell 2</Tile>
                    <Tile>Cell 3</Tile>
                  </Grid>
                </BaseBlock>
              </Stack>

              <Stack gap="md">
                <Label>showHeading=false (block renders its own heading layout)</Label>
                <BaseBlock
                  block={{
                    spacing: 'compact',
                    backgroundTone: 'none',
                    sectionHeading: {
                      enabled: true,
                      eyebrow: 'Eyebrow',
                      heading: 'This heading would auto-render',
                      align: 'left',
                    },
                  }}
                  showHeading={false}
                >
                  <Text size="base">
                    Because <code>showHeading=false</code>, this block skips the automatic
                    SectionHeading render. The block itself can place the heading wherever needed.
                  </Text>
                </BaseBlock>
              </Stack>
            </Stack>
          </section>
        </Stack>
      </Container>
    </main>
  );
}
