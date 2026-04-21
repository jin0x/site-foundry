import {
  BaseBlock,
  Button,
  ButtonColor,
  ButtonVariant,
  Container,
  ContainerSize,
  Grid,
  GridGap,
  Heading,
  HeadingSize,
  Section,
  SectionCta,
  SectionHeading,
  Stack,
  StackGap,
  Text,
  TextColor,
  TextSize,
} from '@site-foundry-template/ui';
import type {
  BackgroundTone,
  SpacingSize,
  Alignment,
} from '@site-foundry-template/sanity-types';
import { DevToc } from '../_components/DevToc';

const SECTIONS = [
  { id: 'section', label: 'Section' },
  { id: 'section-heading', label: 'SectionHeading' },
  { id: 'section-cta', label: 'SectionCta' },
  { id: 'base-block', label: 'BaseBlock' },
];

const TONES: BackgroundTone[] = ['none', 'subtle', 'accent', 'inverse'];
const SPACINGS: SpacingSize[] = ['compact', 'default', 'roomy'];
const ALIGNMENTS: Alignment[] = ['left', 'center'];
const HEADING_SIZES = Object.values(HeadingSize);

function DemoHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" size={HeadingSize.H2} className="border-b border-white/10 pb-2">
      {children}
    </Heading>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text size={TextSize.CAPTION} color={TextColor.MUTED} className="uppercase tracking-widest">
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
      <Container size={ContainerSize.LG}>
        <Stack gap={StackGap.XL2}>
          <header>
            <Heading as="h1" size={HeadingSize.H1}>
              Components — dev catalog
            </Heading>
            <Text size={TextSize.BASE} color={TextColor.MUTED} className="mt-2">
              Section / SectionHeading / SectionCta / BaseBlock variants.
            </Text>
          </header>

          <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
            <DevToc sections={SECTIONS} />
            <Stack gap={StackGap.XL2}>
              {/* ---------- Section ---------- */}
              <section id="section">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Section</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>backgroundTone variants (spacing=&quot;compact&quot;)</Label>
                    {TONES.map((tone) => (
                      <Stack key={tone} gap={StackGap.XS}>
                        <Label>backgroundTone=&quot;{tone}&quot;</Label>
                        <Section backgroundTone={tone} spacing="compact">
                          <Text size={TextSize.BASE}>
                            Sample section content — tone “{tone}”, spacing “compact”.
                          </Text>
                        </Section>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>spacing variants (tone=&quot;subtle&quot;)</Label>
                    {SPACINGS.map((spacing) => (
                      <Stack key={spacing} gap={StackGap.XS}>
                        <Label>spacing=&quot;{spacing}&quot;</Label>
                        <Section backgroundTone="subtle" spacing={spacing}>
                          <Text size={TextSize.BASE}>
                            Sample section content — spacing “{spacing}”.
                          </Text>
                        </Section>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- SectionHeading ---------- */}
              <section id="section-heading">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>SectionHeading</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>full (eyebrow + heading + subheading) × align</Label>
                    {ALIGNMENTS.map((align) => (
                      <Stack key={align} gap={StackGap.XS}>
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

                  <Stack gap={StackGap.MD}>
                    <Label>heading-only × headingSize</Label>
                    {HEADING_SIZES.map((size) => (
                      <Stack key={size} gap={StackGap.XS}>
                        <Label>headingSize=&quot;{size}&quot;</Label>
                        <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                          <SectionHeading heading={`SectionHeading size ${size}`} headingSize={size} />
                        </div>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>subheading-only (ReactNode slot) × align</Label>
                    {ALIGNMENTS.map((align) => (
                      <Stack key={align} gap={StackGap.XS}>
                        <Label>align=&quot;{align}&quot;</Label>
                        <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                          <SectionHeading
                            align={align}
                            subheading={
                              <p>
                                Standalone subheading — useful when the block above already handled
                                the heading.
                              </p>
                            }
                          />
                        </div>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>empty (all undefined) — returns null</Label>
                    <div className="rounded-md border border-white/10 bg-white/[0.03] p-6 text-[var(--color-tertiary)]">
                      <SectionHeading />
                      <em>(no output — SectionHeading returned null)</em>
                    </div>
                  </Stack>
                </Stack>
              </section>

              {/* ---------- SectionCta ---------- */}
              <section id="section-cta">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>SectionCta</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>single CTA × align</Label>
                    {ALIGNMENTS.map((align) => (
                      <Stack key={align} gap={StackGap.XS}>
                        <Label>align=&quot;{align}&quot;</Label>
                        <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                          <SectionCta align={align}>
                            <Button>Get started</Button>
                          </SectionCta>
                        </div>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>two CTAs × align</Label>
                    {ALIGNMENTS.map((align) => (
                      <Stack key={align} gap={StackGap.XS}>
                        <Label>align=&quot;{align}&quot;</Label>
                        <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                          <SectionCta align={align}>
                            <Button color={ButtonColor.PRIMARY}>Primary action</Button>
                            <Button variant={ButtonVariant.OUTLINE} color={ButtonColor.PRIMARY}>
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
              <section id="base-block">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>BaseBlock</DemoHeading>

                  <Stack gap={StackGap.MD}>
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
                      <Grid cols={3} gap={GridGap.SM}>
                        <Tile>Cell 1</Tile>
                        <Tile>Cell 2</Tile>
                        <Tile>Cell 3</Tile>
                      </Grid>
                    </BaseBlock>
                  </Stack>

                  <Stack gap={StackGap.MD}>
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
                      <Text size={TextSize.BASE}>
                        Because <code>showHeading=false</code>, this block skips the automatic
                        SectionHeading render. The block itself can place the heading wherever needed.
                      </Text>
                    </BaseBlock>
                  </Stack>
                </Stack>
              </section>
            </Stack>
          </div>
        </Stack>
      </Container>
    </main>
  );
}
