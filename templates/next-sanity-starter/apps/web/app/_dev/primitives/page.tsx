import {
  Badge,
  Button,
  Container,
  Eyebrow,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@site-foundry-template/ui';
import type {
  BadgeColor,
  BadgeVariant,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  ContainerSize,
  GridCols,
  GridGap,
  HeadingColor,
  HeadingSize,
  ImageAspectRatio,
  ImageRadius,
  StackAlign,
  StackGap,
  TextColor,
  TextSize,
} from '@site-foundry-template/ui';

const STACK_GAPS: StackGap[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const STACK_ALIGNS: StackAlign[] = ['start', 'center', 'end', 'stretch'];
const CONTAINER_SIZES: ContainerSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'wide', 'full'];
const GRID_GAPS: GridGap[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl'];
const GRID_COL_VARIANTS: Array<{ label: string; cols: GridCols }> = [
  { label: 'cols=2', cols: 2 },
  { label: 'cols=3', cols: 3 },
  { label: 'cols=4', cols: 4 },
  { label: 'cols=6', cols: 6 },
  { label: 'cols={mobile:1, tablet:2, desktop:3}', cols: { mobile: 1, tablet: 2, desktop: 3 } },
  { label: 'cols={mobile:2, tablet:3, desktop:6}', cols: { mobile: 2, tablet: 3, desktop: 6 } },
];

const HEADING_SIZES: HeadingSize[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const HEADING_COLORS: HeadingColor[] = [
  'default',
  'foreground',
  'white',
  'primary',
  'secondary',
  'gradient',
  'black',
  'rose',
  'gray',
];

const TEXT_SIZES: TextSize[] = ['caption', 'xs', 'sm', 'base', 'md', 'lg', 'xl'];
const TEXT_COLORS: TextColor[] = [
  'default',
  'muted',
  'subtle',
  'foreground',
  'white',
  'primary',
  'secondary',
  'gradient',
  'black',
  'pale-blue',
  'rose',
  'gray',
  'light-gray',
];

const BUTTON_VARIANTS: ButtonVariant[] = ['solid', 'outline', 'ghost'];
const BUTTON_SIZES: ButtonSize[] = ['sm', 'md', 'lg'];
const BUTTON_COLORS: ButtonColor[] = ['primary', 'secondary', 'light'];

const BADGE_VARIANTS: BadgeVariant[] = ['outline', 'solid'];
const BADGE_COLORS: BadgeColor[] = ['dark', 'primary', 'secondary', 'light'];

const IMAGE_ASPECT_RATIOS: ImageAspectRatio[] = ['auto', 'square', 'video', '4/3', '3/2', '21/9'];
const IMAGE_ROUNDED: ImageRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];

const SAMPLE_IMG =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop';

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/5 p-4 text-sm">{children}</div>
  );
}

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

export default function PrimitivesPage() {
  return (
    <main className="py-16">
      <Container size="lg">
        <Stack gap="2xl">
          <header>
            <Heading as="h1" size="h1">
              Primitives — dev catalog
            </Heading>
            <Text size="base" color="muted" className="mt-2">
              Every variant of every primitive. Updates as new primitives land.
            </Text>
          </header>

          {/* ---------- Stack ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>Stack</DemoHeading>

              <Stack gap="md">
                <Label>gap variants</Label>
                {STACK_GAPS.map((gap) => (
                  <Stack key={gap} gap="xs">
                    <Label>gap=&quot;{gap}&quot;</Label>
                    <Stack gap={gap} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                      <Tile>Item A</Tile>
                      <Tile>Item B</Tile>
                      <Tile>Item C</Tile>
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>align variants</Label>
                {STACK_ALIGNS.map((align) => (
                  <Stack key={align} gap="xs">
                    <Label>align=&quot;{align}&quot;</Label>
                    <Stack
                      gap="sm"
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
          <section>
            <Stack gap="lg">
              <DemoHeading>Container</DemoHeading>
              <Label>size variants (each row is a Container inside the outer LG container)</Label>
              <Stack gap="md">
                {CONTAINER_SIZES.map((size) => (
                  <Stack key={size} gap="xs">
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
          <section>
            <Stack gap="lg">
              <DemoHeading>Grid</DemoHeading>

              <Stack gap="md">
                <Label>cols variants (default gap=&quot;lg&quot;)</Label>
                {GRID_COL_VARIANTS.map(({ label, cols }) => (
                  <Stack key={label} gap="xs">
                    <Label>{label}</Label>
                    <Grid cols={cols}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Tile key={i}>Cell {i + 1}</Tile>
                      ))}
                    </Grid>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>gap variants (cols=3)</Label>
                {GRID_GAPS.map((gap) => (
                  <Stack key={gap} gap="xs">
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
          <section>
            <Stack gap="lg">
              <DemoHeading>Heading</DemoHeading>

              <Stack gap="md">
                <Label>size variants (as=&quot;h2&quot;, color=&quot;default&quot;)</Label>
                {HEADING_SIZES.map((size) => (
                  <Stack key={size} gap="xs">
                    <Label>size=&quot;{size}&quot;</Label>
                    <Heading size={size}>The quick brown fox jumps over the lazy dog</Heading>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>color variants (size=&quot;h3&quot;)</Label>
                {HEADING_COLORS.map((color) => (
                  <Stack key={color} gap="xs">
                    <Label>color=&quot;{color}&quot;</Label>
                    <Heading color={color}>color=&quot;{color}&quot;</Heading>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </section>

          {/* ---------- Text ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>Text</DemoHeading>

              <Stack gap="md">
                <Label>size variants (color=&quot;default&quot;)</Label>
                {TEXT_SIZES.map((size) => (
                  <Stack key={size} gap="xs">
                    <Label>size=&quot;{size}&quot;</Label>
                    <Text size={size}>Pack my box with five dozen liquor jugs.</Text>
                  </Stack>
                ))}
              </Stack>

              <Stack gap="md">
                <Label>color variants (size=&quot;base&quot;)</Label>
                {TEXT_COLORS.map((color) => (
                  <Stack key={color} gap="xs">
                    <Label>color=&quot;{color}&quot;</Label>
                    <Text color={color}>color=&quot;{color}&quot;</Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </section>

          {/* ---------- Eyebrow ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>Eyebrow</DemoHeading>
              <Stack gap="md">
                <Eyebrow>Eyebrow label</Eyebrow>
                <Stack gap="xs">
                  <Eyebrow>Announcing</Eyebrow>
                  <Heading size="h2">Eyebrow + Heading composition</Heading>
                </Stack>
              </Stack>
            </Stack>
          </section>

          {/* ---------- Button ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>Button</DemoHeading>

              <Stack gap="md">
                <Label>variant × color (size=&quot;md&quot;)</Label>
                {BUTTON_VARIANTS.map((variant) => (
                  <Stack key={variant} gap="xs">
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

              <Stack gap="md">
                <Label>size variants (variant=&quot;solid&quot;, color=&quot;primary&quot;)</Label>
                <div className="flex flex-wrap items-center gap-3">
                  {BUTTON_SIZES.map((size) => (
                    <Button key={size} size={size}>
                      size=&quot;{size}&quot;
                    </Button>
                  ))}
                </div>
              </Stack>

              <Stack gap="md">
                <Label>anchor (href present) vs button</Label>
                <div className="flex flex-wrap items-center gap-3">
                  <Button href="#link-demo">anchor (href)</Button>
                  <Button>button (no href)</Button>
                </div>
              </Stack>
            </Stack>
          </section>

          {/* ---------- Badge ---------- */}
          <section>
            <Stack gap="lg">
              <DemoHeading>Badge</DemoHeading>
              <Stack gap="md">
                <Label>variant × color</Label>
                {BADGE_VARIANTS.map((variant) => (
                  <Stack key={variant} gap="xs">
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
          <section>
            <Stack gap="lg">
              <DemoHeading>Image</DemoHeading>

              <Stack gap="md">
                <Label>aspectRatio variants (fit=&quot;cover&quot;, rounded=&quot;md&quot;)</Label>
                <Grid cols={3} gap="md">
                  {IMAGE_ASPECT_RATIOS.map((aspectRatio) => (
                    <Stack key={aspectRatio} gap="xs">
                      <Label>aspectRatio=&quot;{aspectRatio}&quot;</Label>
                      <Image
                        src={SAMPLE_IMG}
                        alt="Sample"
                        aspectRatio={aspectRatio}
                        rounded="md"
                      />
                    </Stack>
                  ))}
                </Grid>
              </Stack>

              <Stack gap="md">
                <Label>rounded variants (aspectRatio=&quot;square&quot;)</Label>
                <Grid cols={3} gap="md">
                  {IMAGE_ROUNDED.map((rounded) => (
                    <Stack key={rounded} gap="xs">
                      <Label>rounded=&quot;{rounded}&quot;</Label>
                      <Image
                        src={SAMPLE_IMG}
                        alt="Sample"
                        aspectRatio="square"
                        rounded={rounded}
                      />
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </section>
        </Stack>
      </Container>
    </main>
  );
}
