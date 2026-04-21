import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  BadgeColor,
  BadgeVariant,
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  Card,
  CardPadding,
  CardRadius,
  CardVariant,
  Container,
  ContainerSize,
  Eyebrow,
  Grid,
  GridGap,
  Heading,
  HeadingColor,
  HeadingSize,
  Image,
  ImageAspectRatio,
  ImageRadius,
  Marquee,
  MarqueeGap,
  MarqueeSpeed,
  Stack,
  StackAlign,
  StackGap,
  Text,
  TextColor,
  TextSize,
} from '@site-foundry-template/ui';
import type { GridCols } from '@site-foundry-template/ui';
import { DevToc } from '../_components/DevToc';

const SECTIONS = [
  { id: 'stack', label: 'Stack' },
  { id: 'container', label: 'Container' },
  { id: 'grid', label: 'Grid' },
  { id: 'heading', label: 'Heading' },
  { id: 'text', label: 'Text' },
  { id: 'eyebrow', label: 'Eyebrow' },
  { id: 'button', label: 'Button' },
  { id: 'badge', label: 'Badge' },
  { id: 'image', label: 'Image' },
  { id: 'card', label: 'Card' },
  { id: 'accordion', label: 'Accordion' },
  { id: 'marquee', label: 'Marquee' },
];

const STACK_GAPS = Object.values(StackGap);
const STACK_ALIGNS = Object.values(StackAlign);
const CONTAINER_SIZES = Object.values(ContainerSize);
const GRID_GAPS = Object.values(GridGap);
const HEADING_SIZES = Object.values(HeadingSize);
const HEADING_COLORS = Object.values(HeadingColor);
const TEXT_SIZES = Object.values(TextSize);
const TEXT_COLORS = Object.values(TextColor);
const BUTTON_VARIANTS = Object.values(ButtonVariant);
const BUTTON_SIZES = Object.values(ButtonSize);
const BUTTON_COLORS = Object.values(ButtonColor);
const BADGE_VARIANTS = Object.values(BadgeVariant);
const BADGE_COLORS = Object.values(BadgeColor);
const IMAGE_ASPECT_RATIOS = Object.values(ImageAspectRatio);
const IMAGE_ROUNDED = Object.values(ImageRadius);
const CARD_VARIANTS = Object.values(CardVariant);
const CARD_PADDINGS = Object.values(CardPadding);
const CARD_RADII = Object.values(CardRadius);
const MARQUEE_SPEEDS = Object.values(MarqueeSpeed);
const MARQUEE_GAPS = Object.values(MarqueeGap);

const GRID_COL_VARIANTS: Array<{ label: string; cols: GridCols }> = [
  { label: 'cols=2', cols: 2 },
  { label: 'cols=3', cols: 3 },
  { label: 'cols=4', cols: 4 },
  { label: 'cols=6', cols: 6 },
  { label: 'cols={mobile:1, tablet:2, desktop:3}', cols: { mobile: 1, tablet: 2, desktop: 3 } },
  { label: 'cols={mobile:2, tablet:3, desktop:6}', cols: { mobile: 2, tablet: 3, desktop: 6 } },
];

const MARQUEE_ITEMS = [
  'Figma → Sanity',
  'Design Tokens',
  'Primitives',
  'Composites',
  'Blocks',
  'Pages',
  'Site Foundry',
];

const ACCORDION_ITEMS = [
  {
    value: 'one',
    question: 'What is Site Foundry?',
    answer:
      'Site Foundry is a toolchain that turns Figma designs into production-ready Sanity content models and Next.js code.',
  },
  {
    value: 'two',
    question: 'How are primitives organized?',
    answer:
      'Each primitive lives in its own directory under packages/ui/src/primitives, with a types file, an implementation file, and an index barrel.',
  },
  {
    value: 'three',
    question: 'Can I customize the theme?',
    answer:
      'Yes — themeable tokens live in packages/tokens/src/theme.css and are imported by the UI package globals.',
  },
];

const SAMPLE_IMG =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop';

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/5 p-4 text-sm">{children}</div>
  );
}

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

export default function PrimitivesPage() {
  return (
    <main className="py-16">
      <Container size={ContainerSize.LG}>
        <Stack gap={StackGap.XL2}>
          <header>
            <Heading as="h1" size={HeadingSize.H1}>
              Primitives — dev catalog
            </Heading>
            <Text size={TextSize.BASE} color={TextColor.MUTED} className="mt-2">
              Every variant of every primitive. Updates as new primitives land.
            </Text>
          </header>

          <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
            <DevToc sections={SECTIONS} />
            <Stack gap={StackGap.XL2}>
              {/* ---------- Stack ---------- */}
              <section id="stack">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Stack</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>gap variants</Label>
                    {STACK_GAPS.map((gap) => (
                      <Stack key={gap} gap={StackGap.XS}>
                        <Label>gap=&quot;{gap}&quot;</Label>
                        <Stack
                          gap={gap}
                          className="rounded-md border border-white/10 bg-white/[0.03] p-4"
                        >
                          <Tile>Item A</Tile>
                          <Tile>Item B</Tile>
                          <Tile>Item C</Tile>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>align variants</Label>
                    {STACK_ALIGNS.map((align) => (
                      <Stack key={align} gap={StackGap.XS}>
                        <Label>align=&quot;{align}&quot;</Label>
                        <Stack
                          gap={StackGap.SM}
                          align={align}
                          className="rounded-md border border-white/10 bg-white/[0.03] p-4"
                        >
                          <Tile>short</Tile>
                          <Tile>a longer item that takes more room</Tile>
                          <Tile>mid</Tile>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Container ---------- */}
              <section id="container">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Container</DemoHeading>
                  <Label>size variants (each row is a Container inside the outer LG container)</Label>
                  <Stack gap={StackGap.MD}>
                    {CONTAINER_SIZES.map((size) => (
                      <Stack key={size} gap={StackGap.XS}>
                        <Label>size=&quot;{size}&quot;</Label>
                        <Container
                          size={size}
                          className="rounded-md border border-white/10 bg-white/[0.03] py-3 text-center text-sm"
                        >
                          Container size=&quot;{size}&quot;
                        </Container>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Grid ---------- */}
              <section id="grid">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Grid</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>cols variants (default gap=&quot;lg&quot;)</Label>
                    {GRID_COL_VARIANTS.map(({ label, cols }) => (
                      <Stack key={label} gap={StackGap.XS}>
                        <Label>{label}</Label>
                        <Grid cols={cols}>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <Tile key={i}>Cell {i + 1}</Tile>
                          ))}
                        </Grid>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>gap variants (cols=3)</Label>
                    {GRID_GAPS.map((gap) => (
                      <Stack key={gap} gap={StackGap.XS}>
                        <Label>gap=&quot;{gap}&quot;</Label>
                        <Grid cols={3} gap={gap}>
                          <Tile>A</Tile>
                          <Tile>B</Tile>
                          <Tile>C</Tile>
                        </Grid>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Heading ---------- */}
              <section id="heading">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Heading</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>size variants (as=&quot;h2&quot;, color=&quot;default&quot;)</Label>
                    {HEADING_SIZES.map((size) => (
                      <Stack key={size} gap={StackGap.XS}>
                        <Label>size=&quot;{size}&quot;</Label>
                        <Heading size={size}>The quick brown fox jumps over the lazy dog</Heading>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>color variants (size=&quot;h3&quot;)</Label>
                    {HEADING_COLORS.map((color) => (
                      <Stack key={color} gap={StackGap.XS}>
                        <Label>color=&quot;{color}&quot;</Label>
                        <Heading color={color}>color=&quot;{color}&quot;</Heading>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Text ---------- */}
              <section id="text">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Text</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>size variants (color=&quot;default&quot;)</Label>
                    {TEXT_SIZES.map((size) => (
                      <Stack key={size} gap={StackGap.XS}>
                        <Label>size=&quot;{size}&quot;</Label>
                        <Text size={size}>Pack my box with five dozen liquor jugs.</Text>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>color variants (size=&quot;base&quot;)</Label>
                    {TEXT_COLORS.map((color) => (
                      <Stack key={color} gap={StackGap.XS}>
                        <Label>color=&quot;{color}&quot;</Label>
                        <Text color={color}>color=&quot;{color}&quot;</Text>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Eyebrow ---------- */}
              <section id="eyebrow">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Eyebrow</DemoHeading>
                  <Stack gap={StackGap.MD}>
                    <Eyebrow>Eyebrow label</Eyebrow>
                    <Stack gap={StackGap.XS}>
                      <Eyebrow>Announcing</Eyebrow>
                      <Heading size={HeadingSize.H2}>Eyebrow + Heading composition</Heading>
                    </Stack>
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Button ---------- */}
              <section id="button">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Button</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>variant × color (size=&quot;md&quot;)</Label>
                    {BUTTON_VARIANTS.map((variant) => (
                      <Stack key={variant} gap={StackGap.XS}>
                        <Label>variant=&quot;{variant}&quot;</Label>
                        <div className="flex flex-wrap gap-3">
                          {BUTTON_COLORS.map((color) => (
                            <Button key={color} variant={variant} color={color}>
                              {variant} / {color}
                            </Button>
                          ))}
                        </div>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>size variants (variant=&quot;solid&quot;, color=&quot;primary&quot;)</Label>
                    <div className="flex flex-wrap items-center gap-3">
                      {BUTTON_SIZES.map((size) => (
                        <Button key={size} size={size}>
                          size=&quot;{size}&quot;
                        </Button>
                      ))}
                    </div>
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>anchor (href present) vs button</Label>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button href="#link-demo">anchor (href)</Button>
                      <Button>button (no href)</Button>
                    </div>
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Badge ---------- */}
              <section id="badge">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Badge</DemoHeading>
                  <Stack gap={StackGap.MD}>
                    <Label>variant × color</Label>
                    {BADGE_VARIANTS.map((variant) => (
                      <Stack key={variant} gap={StackGap.XS}>
                        <Label>variant=&quot;{variant}&quot;</Label>
                        <div className="flex flex-wrap gap-3">
                          {BADGE_COLORS.map((color) => (
                            <Badge key={color} variant={variant} color={color}>
                              {variant} / {color}
                            </Badge>
                          ))}
                        </div>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Image ---------- */}
              <section id="image">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Image</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>aspectRatio variants (fit=&quot;cover&quot;, rounded=&quot;md&quot;)</Label>
                    <Grid cols={3} gap={GridGap.MD}>
                      {IMAGE_ASPECT_RATIOS.map((aspectRatio) => (
                        <Stack key={aspectRatio} gap={StackGap.XS}>
                          <Label>aspectRatio=&quot;{aspectRatio}&quot;</Label>
                          <Image
                            src={SAMPLE_IMG}
                            alt="Sample"
                            aspectRatio={aspectRatio}
                            rounded={ImageRadius.MD}
                          />
                        </Stack>
                      ))}
                    </Grid>
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>rounded variants (aspectRatio=&quot;square&quot;)</Label>
                    <Grid cols={3} gap={GridGap.MD}>
                      {IMAGE_ROUNDED.map((rounded) => (
                        <Stack key={rounded} gap={StackGap.XS}>
                          <Label>rounded=&quot;{rounded}&quot;</Label>
                          <Image
                            src={SAMPLE_IMG}
                            alt="Sample"
                            aspectRatio={ImageAspectRatio.SQUARE}
                            rounded={rounded}
                          />
                        </Stack>
                      ))}
                    </Grid>
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Card ---------- */}
              <section id="card">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Card</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>variant variants (padding=&quot;md&quot;, radius=&quot;xl&quot;)</Label>
                    <Grid cols={3} gap={GridGap.MD}>
                      {CARD_VARIANTS.map((variant) => (
                        <Stack key={variant} gap={StackGap.XS}>
                          <Label>variant=&quot;{variant}&quot;</Label>
                          <Card variant={variant}>
                            <Text size={TextSize.SM}>Card with variant “{variant}”.</Text>
                          </Card>
                        </Stack>
                      ))}
                    </Grid>
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>padding variants (variant=&quot;default&quot;)</Label>
                    <Grid cols={4} gap={GridGap.MD}>
                      {CARD_PADDINGS.map((padding) => (
                        <Stack key={padding} gap={StackGap.XS}>
                          <Label>padding=&quot;{padding}&quot;</Label>
                          <Card padding={padding}>
                            <Text size={TextSize.SM}>p=&quot;{padding}&quot;</Text>
                          </Card>
                        </Stack>
                      ))}
                    </Grid>
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>radius variants (variant=&quot;default&quot;)</Label>
                    <Grid cols={5} gap={GridGap.MD}>
                      {CARD_RADII.map((radius) => (
                        <Stack key={radius} gap={StackGap.XS}>
                          <Label>radius=&quot;{radius}&quot;</Label>
                          <Card radius={radius}>
                            <Text size={TextSize.SM}>r=&quot;{radius}&quot;</Text>
                          </Card>
                        </Stack>
                      ))}
                    </Grid>
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>composition sample (Card + Eyebrow + Heading + Text)</Label>
                    <Grid cols={3} gap={GridGap.MD}>
                      <Card as="article">
                        <Stack gap={StackGap.SM}>
                          <Eyebrow>Primitive</Eyebrow>
                          <Heading as="h3" size={HeadingSize.H3}>
                            Sample card
                          </Heading>
                          <Text size={TextSize.BASE} color={TextColor.MUTED}>
                            Dropped-in composition of Eyebrow, Heading, and Text inside a Card.
                          </Text>
                        </Stack>
                      </Card>
                      <Card as="article">
                        <Stack gap={StackGap.SM}>
                          <Eyebrow>Primitive</Eyebrow>
                          <Heading as="h3" size={HeadingSize.H3}>
                            Another card
                          </Heading>
                          <Text size={TextSize.BASE} color={TextColor.MUTED}>
                            Same pattern that FeatureGridBlock now uses.
                          </Text>
                        </Stack>
                      </Card>
                      <Card as="article">
                        <Stack gap={StackGap.SM}>
                          <Eyebrow>Primitive</Eyebrow>
                          <Heading as="h3" size={HeadingSize.H3}>
                            Third card
                          </Heading>
                          <Text size={TextSize.BASE} color={TextColor.MUTED}>
                            All variants controlled by the Card prop API.
                          </Text>
                        </Stack>
                      </Card>
                    </Grid>
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Accordion ---------- */}
              <section id="accordion">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Accordion</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>type=&quot;single&quot; (default, defaultValue=&quot;one&quot;)</Label>
                    <Accordion type="single" defaultValue="one">
                      {ACCORDION_ITEMS.map((item) => (
                        <AccordionItem key={item.value} value={item.value}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>
                      type=&quot;multiple&quot; (defaultValue=[&quot;one&quot;, &quot;three&quot;])
                    </Label>
                    <Accordion type="multiple" defaultValue={['one', 'three']}>
                      {ACCORDION_ITEMS.map((item) => (
                        <AccordionItem key={item.value} value={item.value}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Stack>
                </Stack>
              </section>

              {/* ---------- Marquee ---------- */}
              <section id="marquee">
                <Stack gap={StackGap.LG}>
                  <DemoHeading>Marquee</DemoHeading>

                  <Stack gap={StackGap.MD}>
                    <Label>speed variants (gap=&quot;lg&quot;, pauseOnHover, fade)</Label>
                    {MARQUEE_SPEEDS.map((speed) => (
                      <Stack key={speed} gap={StackGap.XS}>
                        <Label>speed=&quot;{speed}&quot;</Label>
                        <Marquee speed={speed}>
                          {MARQUEE_ITEMS.map((item) => (
                            <Badge
                              key={item}
                              variant={BadgeVariant.OUTLINE}
                              color={BadgeColor.LIGHT}
                            >
                              {item}
                            </Badge>
                          ))}
                        </Marquee>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>gap variants (speed=&quot;medium&quot;)</Label>
                    {MARQUEE_GAPS.map((gap) => (
                      <Stack key={gap} gap={StackGap.XS}>
                        <Label>gap=&quot;{gap}&quot;</Label>
                        <Marquee gap={gap}>
                          {MARQUEE_ITEMS.map((item) => (
                            <Badge
                              key={item}
                              variant={BadgeVariant.OUTLINE}
                              color={BadgeColor.LIGHT}
                            >
                              {item}
                            </Badge>
                          ))}
                        </Marquee>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack gap={StackGap.MD}>
                    <Label>reverse=true, fade=false, pauseOnHover=false</Label>
                    <Marquee reverse fade={false} pauseOnHover={false}>
                      {MARQUEE_ITEMS.map((item) => (
                        <Badge
                          key={item}
                          variant={BadgeVariant.SOLID}
                          color={BadgeColor.PRIMARY}
                        >
                          {item}
                        </Badge>
                      ))}
                    </Marquee>
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
