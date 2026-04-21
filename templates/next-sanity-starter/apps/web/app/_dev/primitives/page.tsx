import { Container, Grid, Stack } from '@site-foundry-template/ui';
import type {
  ContainerSize,
  GridCols,
  GridGap,
  StackAlign,
  StackGap,
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

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/5 p-4 text-sm">{children}</div>
  );
}

function DemoHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h2 font-heading border-b border-white/10 pb-2">{children}</h2>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-caption uppercase tracking-widest text-secondary">{children}</p>;
}

export default function PrimitivesPage() {
  return (
    <main className="py-16">
      <Container size="lg">
        <Stack gap="2xl">
          <header>
            <h1 className="text-h1 font-heading">Primitives — dev catalog</h1>
            <p className="text-body text-secondary mt-2">
              Every variant of every primitive. Updates as new primitives land.
            </p>
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
        </Stack>
      </Container>
    </main>
  );
}
