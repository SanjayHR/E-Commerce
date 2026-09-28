import React from 'react';

const values = [
	{
		icon: '✦',
		title: 'Purpose-driven',
		text: 'We build thoughtful experiences that solve real problems and make everyday work feel simpler.'
	},
	{
		icon: '◎',
		title: 'People first',
		text: 'Our users, partners, and team are at the heart of every decision we make.'
	},
	{
		icon: '↗',
		title: 'Always improving',
		text: 'We stay curious, learn from feedback, and keep raising the bar together.'
	}
];

function About() {
	return (
		<main style={styles.page}>
			<section style={styles.hero}>
				<div style={styles.eyebrow}>ABOUT US</div>
				<h1 style={styles.heading}>Building better things,<br /><span style={styles.accent}>together.</span></h1>
				<p style={styles.intro}>
					We are a passionate team of creators, thinkers, and problem-solvers on a mission to make a meaningful difference through our work.
				</p>
				<a href="#story" style={styles.button}>Discover our story <span>↓</span></a>
				<div style={styles.orb} aria-hidden="true" />
			</section>

			<section id="story" style={styles.story}>
				<div style={styles.storyLabel}>OUR STORY</div>
				<div>
					<h2 style={styles.subheading}>Small beginnings.<br />A big ambition.</h2>
					<p style={styles.body}>
						What started as a shared idea has grown into a community united by curiosity and a belief that great work comes from working together. Today, we combine creativity, craft, and technology to turn ambitious ideas into lasting impact.
					</p>
				</div>
			</section>

			<section style={styles.values}>
				<div style={styles.storyLabel}>WHAT DRIVES US</div>
				<div style={styles.valueGrid}>
					{values.map((value) => (
						<article key={value.title} style={styles.card}>
							<div style={styles.icon}>{value.icon}</div>
							<h3 style={styles.cardTitle}>{value.title}</h3>
							<p style={styles.cardText}>{value.text}</p>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}

const styles = {
	page: { minHeight: '100vh', background: '#f7f4ee', color: '#17221d', fontFamily: 'Inter, Arial, sans-serif' },
	hero: { position: 'relative', overflow: 'hidden', padding: '110px 10% 125px', background: '#173b35', color: '#f7f4ee' },
	eyebrow: { letterSpacing: '3px', fontSize: '12px', fontWeight: 700, color: '#b9d8bd', marginBottom: '28px' },
	heading: { position: 'relative', zIndex: 1, maxWidth: '700px', margin: 0, fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 0.98, letterSpacing: '-4px', fontWeight: 700 },
	accent: { color: '#b9d8bd' },
	intro: { position: 'relative', zIndex: 1, maxWidth: '470px', margin: '34px 0', color: '#d6e4d8', fontSize: '18px', lineHeight: 1.65 },
	button: { position: 'relative', zIndex: 1, display: 'inline-flex', gap: '18px', alignItems: 'center', padding: '15px 21px', borderRadius: '30px', background: '#d9ecbd', color: '#173b35', textDecoration: 'none', fontWeight: 700 },
	orb: { position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', right: '8%', top: '18%', background: 'radial-gradient(circle at 35% 30%, #bfdba5, #5c9473 45%, #173b35 72%)', opacity: 0.75 },
	story: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', padding: '100px 10%', alignItems: 'start' },
	storyLabel: { color: '#60826b', fontSize: '12px', letterSpacing: '2px', fontWeight: 700 },
	subheading: { margin: '0 0 24px', fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.05, letterSpacing: '-2px' },
	body: { maxWidth: '650px', margin: 0, color: '#637069', fontSize: '18px', lineHeight: 1.7 },
	values: { padding: '75px 10% 110px', background: '#e6eee3' },
	valueGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px', marginTop: '35px' },
	card: { padding: '30px', background: '#f7f4ee', borderRadius: '14px' },
	icon: { color: '#6c9c73', fontSize: '31px', marginBottom: '25px' },
	cardTitle: { margin: '0 0 12px', fontSize: '21px' },
	cardText: { margin: 0, color: '#637069', lineHeight: 1.6 }
};

export default About;
