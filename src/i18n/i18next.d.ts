// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import features from "./locales/en/features.json";
import interface1 from "./locales/en/interface.json";
import tips from "./locales/en/tips.json";
import units from "./locales/en/units.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "units";
    // custom resources type
    resources: {
      features: typeof features;
      interface: typeof interface1;
      tips: typeof tips;
      units: typeof units;
    };
    // other
  }
}
