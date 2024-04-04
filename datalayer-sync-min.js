(window.getCookie =
  window.getCookie ||
  function(e) {
    e = ("; " + document.cookie).split("; " + e + "=");
    if (2 <= e.length) return e.pop().split(";").shift();
  }),
  (window.adobeDataLayer = window.adobeDataLayer || []),
  (window.SCS = window.SCS || {}),
  (window.SCS.datalayer = window.SCS.datalayer || {
    version: "202311071100",
    _initialized: !1,
    queue: [],
    queueStarted: !1,
    callHistory: [],
    data: {},
    log: function(e) {
      "undefined" != typeof _satellite && _satellite?.logger?.debug
        ? _satellite.logger.debug(e)
        : "undefined" != typeof console && console?.debug(e);
    },
    load: function(a, e, t) {
      try {
        var n,
          o,
          r = document.createElement("script");
        (r.src = a), (r.async = void 0 === e || e), (r.type = "text/javascript"), (t = t || {});
        for ([n, o] of Object.entries(t)) r.setAttribute(n, String(o));
        document.getElementsByTagName("head")[0].appendChild(r);
      } catch (e) {
        SCS.datalayer.log(">>> error injecting script: " + e, a);
      }
    },
    get: function(e, a) {
      if (window?.lth?.get) return window.lth.get(e, event, a);
    },
    cloneMandatoryData: function() {
      if (
        (window.console &&
          !document.location.hostname.includes("www.") &&
          window.console.log("SCS.datalayer.cloneMandatoryData() is deprecated and no longer required"),
          "undefined" != typeof adobeDataLayer && "function" == typeof adobeDataLayer.getState)
      ) {
        var e = adobeDataLayer.getState();
        if (e && e.page && e.platform) return e;
        if (0 < SCS.datalayer.queue.length) {
          e = SCS.datalayer.queue.filter((e) => e.page && e.platform);
          if (0 < e.length) return ({ page: e, platform: a } = [e[0]][0]), { page: e, platform: a };
        }
      }
      var a;
      return { page: {}, platform: {} };
    },
    getAnalyticsPageName: function() {
      return "undefined" != typeof _satellite ? _satellite.getVar("analyticsPageName") : void 0;
    },
    page: function(e) {
      SCS.datalayer.log(">>> SCS.datalayer.page() called"), this._process(e, "page");
    },
    track: function(e) {
      SCS.datalayer.log(">>> SCS.datalayer.track() called"), this._process(e, "track");
    },
    setState: function(e) {
      try {
        var a, t, n;
        "object" == typeof e &&
          (({ page: a, platform: t } = e), "object" == typeof a && "object" == typeof t) &&
          ((n = "initialData"),
            this._queueStarted
              ? (window.adobeDataLayer.push({ event: n, page: a, platform: t }), this.releaseQueue())
              : SCS.datalayer.queue.unshift({ event: n, page: a, platform: t }));
      } catch (e) {
        SCS.datalayer.log(">>> SCS.datalayer.setState: error setting state: " + e);
      }
    },
    _process: function(e, a) {
      try {
        if (e && a) {
          this.callHistory.push({ data: e, type: a });
          var t = { event: a, eventInfo: {} };
          for (const n in e)
            void 0 === e[n] ||
              null === e[n] ||
              (Array.isArray(e[n]) && 0 === e[n].length) ||
              ("object" == typeof e[n] && 0 === Object.keys(e[n]).length)
              ? (SCS.datalayer.log(">>> SCS.datalayer: dropping undefined property " + n), delete e[n])
              : ["page", "platform", "profile"].includes(n)
                ? (t[n] = e[n])
                : (t.eventInfo[n] = e[n]);
          t.platform && (t.platform.name = t.platform.platform),
            this._queueStarted
              ? (window.adobeDataLayer.push(t), (this.data = { ...(window.adobeDataLayer?.getState?.() || {}), ...e }))
              : (SCS.datalayer.queue.push(t), (this.data = e));
        }
      } catch (e) {
        SCS.datalayer.log(">>> error processing tracking call: " + e);
      }
    },
    releaseQueue: function() {
      try {
        SCS.datalayer.log(">>> SCS.datalayer: releasing " + SCS.datalayer.queue.length + " queue items"),
          (this._queueStarted = !0);
        (e = SCS.datalayer.queue),
          (t = function() {
            window.adobeDataLayer.push(SCS.datalayer.queue.shift());
          }),
          (n = 250),
          e.forEach(function(e, a) {
            setTimeout(function() {
              t();
            }, a * n);
          });
      } catch (e) {
        console.error(">>> error releasing queue: " + e);
      }
      var e, t, n;
    },
    _loadConsentBanner: function(e) {
      const { domain: a, platform: t, env: n } = e;
      let o = void 0;
      if (
        ("swisscom" === a
          ? ((o = "a8488749-c96d-4b85-a048-1448106c613c"),
            document.location.hostname.includes(".swisscom.com") && (o = "b34d1a20-56c6-405a-8db3-22a6c6804219"),
            document.location.hostname.includes(".swissptt.ch") && (o = "98f39670-9e59-45e5-82a5-785af7cbb1c0"))
          : "bluewin" === a
            ? (o = "e038ef37-dafe-47b6-a008-7d96f3a80149")
            : "blueplus" === a &&
            ("blueplus" === t && (o = "58dae293-e953-47fe-8f05-6867ab175bf4"),
              "blue" === t && (o = "96fcb07f-0426-42a4-9294-630c6e69f7bc"),
              "bluecinema" === t) &&
            (o = "d7e0b526-68de-456b-af0b-1d42650168ab"),
          !(o += "prod" === n ? "" : "-test"))
      )
        throw new Error("no consent property found for " + a + " / " + t + " / " + n);
      var e = "undefined" != typeof localStorage && "true" === localStorage.getItem("appOptOut"),
        r = new URLSearchParams(window.location.search);
      if (!(!r.get("app") || "true" !== r.get("optout")) || e)
        localStorage.setItem("appOptOut", "true"),
          SCS.datalayer.log(">>> App opt out: suppressing cookie consent banner");
      else {
        for (const a of ["localhost", ".corproot.net", "cms.", "swisscomch.swisscom.com"])
          if (document.location.hostname.includes(a))
            return (
              SCS.datalayer.log(">>> Suppressing consent banner for blacklisted domain and releasing queue"),
              void SCS.datalayer.releaseQueue()
            );
        let e = !0;
        (e = document.location.hostname.includes("cms.") && !document.URL.includes("wcmmode=disabled") ? !1 : e)
          ? ((r = { charSet: "UTF-8", "data-domain-script": o, "data-document-language": "true" }),
            ["tv.blue.ch"].some((e) => document.location.hostname.includes(e)) && delete r["data-document-language"],
            SCS.datalayer.load("https://cdn.cookielaw.org/scripttemplates/otSDKStub.js", !1, r))
          : SCS.datalayer.log(">>> SUPPRESSING CONSENT BANNER");
      }
    },
    _loadTagManager: function(e) {
      var { domain: e, env: a } = e;
      let t = void 0;
      if (
        (["swisscom"].includes(e) &&
          (t =
            "prod" === a
              ? "4cf4f6043663/launch-a2a8ec9c4e3e.min.js"
              : "4cf4f6043663/launch-0c232d70d3dd-development.min.js"),
          ["blueplus"].includes(e) &&
          (t =
            "prod" === a
              ? "67d6dc0f5ba7/launch-b10bc232f97d.min.js"
              : "67d6dc0f5ba7/launch-6602afedfe17-development.min.js"),
          !(t = ["bluewin"].includes(e)
            ? "prod" === a
              ? "ac145d9e1821/launch-5c478d1148ab.min.js"
              : "ac145d9e1821/launch-39f1d7c8b51d-development.min.js"
            : t))
      )
        throw new Error("no tag manager property found for " + e + " / " + a);
      SCS.datalayer.load("https://assets.adobedtm.com/cf0f8dbc2470/" + t, !0);
    },
    applyConfig: function() {
      let a = { domain: void 0, platform: void 0, env: void 0 };
      var e = document.getElementById("datalayer-api");
      e &&
        (SCS.datalayer.log(">>> SCS.datalayer: found script tag data attributes"),
          (a.domain = e.getAttribute("data-domain")),
          (a.platform = e.getAttribute("data-platform")),
          (a.env = e.getAttribute("data-env")));
      for (const t in (a = Object.assign(a, window.datalayerConfig)))
        a.hasOwnProperty(t) && "string" == typeof a[t] && (a[t] = a[t].toLowerCase());
      if (
        (window.adobeDataLayer.push({ event: "datalayerConfig", eventInfo: { config: a } }),
          Object.values(a).some((e) => null == e || "" === e))
      )
        window.console &&
          console.error(
            ">>> SCS.datalayer: invalid config, you must set data attributes on the script tag or set window.datalayerConfig",
          );
      else
        try {
          this._loadConsentBanner(a),
            this._loadTagManager(a),
            this.log(">>> SCS.datalayer: loaded config " + a.domain + " / " + a.platform + " / " + a.env);
        } catch (e) {
          console.error(
            ">>> SCS.datalayer: invalid dataLayer configuration. Consent banner and/or tag manager not loaded. " +
            JSON.stringify(a) +
            ", error: " +
            e,
          );
        }
    },
    getConsent: function(e) {
      const a = {
        analytics: "C0002:1",
        functional: "C0003:1",
        marketing: "C0004:1",
        visitorRecognition: "C0009:1",
        personalization: "C0011:1",
      },
        t = decodeURIComponent(getCookie("OptanonConsent") || "");
      let n = {};
      return (
        Object.keys(a).forEach((e) => {
          n[e] = t.includes(a[e]);
        }),
        e ? n[e] : n
      );
    },
  }),
  (window.SCS.dl = window.SCS.datalayer),
  SCS.datalayer.applyConfig();
const consentInterval = setInterval(() => {
  var e;
  void 0 !== window.OneTrust &&
    window.OneTrust.OnConsentChanged &&
    (clearInterval(consentInterval),
      (e = [".swissptt.ch"]),
      window.OneTrust.IsAlertBoxClosed?.() || e.some((e) => document.location.hostname.includes(e))
        ? (SCS.datalayer.log(">>> Consent: consentLoaded"),
          adobeDataLayer.push({ event: "consentLoaded" }),
          SCS.datalayer.releaseQueue(),
          window.OneTrust.OnConsentChanged(() => {
            SCS.datalayer.log(">>> Consent: consentChanged"), adobeDataLayer.push({ event: "consentChanged" });
          }))
        : (SCS.datalayer.log(">>> Consent not yet given, waiting for user to give initial consent"),
          window.OneTrust.OnConsentChanged(() => {
            SCS.datalayer.log(">>> Consent: consentChanged"),
              adobeDataLayer.push({ event: "consentChanged" }),
              SCS.datalayer.releaseQueue();
          })));
}, 250);
