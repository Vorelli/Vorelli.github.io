function n(n, r) { if (!n.includes(r)) { return [...n, r] } return n } function r(n, r) { if (n.includes(r)) { return n.filter((n => n !== r)) } return n } function t(n, r) { let t = {}; for (const u in n) { t = { ...t, ...r(u, n[u]) } } return t } export { n as a, t as o, r };
//# sourceMappingURL=p-9e1eebe9.js.map
