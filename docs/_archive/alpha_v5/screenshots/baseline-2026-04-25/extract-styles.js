// Run in browser console — finds AutoSwitchingCards section and reports computed styles
const heading = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('You\'ve got'));
if (!heading) { console.log(JSON.stringify({ error: 'heading not found' })); }
else {
  const section = heading.closest('section');
  const rect = section.getBoundingClientRect();
  const cs = (el) => {
    const s = getComputedStyle(el);
    return {
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      color: s.color,
      backgroundColor: s.backgroundColor,
    };
  };
  // sample elements
  const cardTitle = section.querySelector('h3');
  const cardDesc = cardTitle ? cardTitle.parentElement.querySelector('p') : null;
  const subheading = section.querySelector('h2 + div p, h2 ~ div p');
  const result = {
    sectionBounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    sectionBg: getComputedStyle(section).backgroundColor,
    heading: cs(heading),
    headingText: heading.textContent,
    subheading: subheading ? cs(subheading) : null,
    cardTitle: cardTitle ? cs(cardTitle) : null,
    cardTitleText: cardTitle ? cardTitle.textContent : null,
    cardDesc: cardDesc ? cs(cardDesc) : null,
    cardDescText: cardDesc ? cardDesc.textContent.slice(0, 80) : null,
    pageBodyBg: getComputedStyle(document.body).backgroundColor,
  };
  console.log('STYLES_JSON_BEGIN');
  console.log(JSON.stringify(result, null, 2));
  console.log('STYLES_JSON_END');
}
