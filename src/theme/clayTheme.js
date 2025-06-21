const clayTheme = {
  global: {
    theme: "dark",
    fontFamily: "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    borderRadius: "8px",
    transition: "0.2s ease-in-out",
  },
  colors: {
    background: {
      primary: "#1A1A2E",
      secondary: "#2B2B4A",
      tertiary: "#3D3D60",
    },
    text: {
      primary: "#E0E0FF",
      secondary: "#B0B0D0",
      heading: "#FFFFFF",
      accent: "#6C63FF",
    },
    border: {
      light: "rgba(255, 255, 255, 0.1)",
      medium: "rgba(255, 255, 255, 0.2)",
    },
    accent: {
      primary: "#6C63FF",
      secondary: "#8A83FF",
    },
    icon: {
      default: "#B0B0D0",
      active: "#FFFFFF",
      accent: "#6C63FF",
    },
    gradients: {
      primaryAccent: "linear-gradient(135deg, #6C63FF 0%, #8A83FF 100%)",
      subtleBackground: "linear-gradient(180deg, #2B2B4A 0%, #1A1A2E 100%)",
    },
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: "1.8rem", fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: "1.4rem", fontWeight: 500, lineHeight: 1.4 },
    bodyLarge: { fontSize: "1.1rem", fontWeight: 400, lineHeight: 1.5 },
    bodyRegular: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
    bodySmall: { fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.5 },
    label: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "#B0B0D0",
    },
  },
  spacing: {
    unit: "8px",
    xxs: "4px",
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "48px",
    xxl: "64px",
  },
  dropShadows: {
    light: "0 2px 5px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 10px rgba(0, 0, 0, 0.2)",
    elevated: "0 8px 25px rgba(0, 0, 0, 0.4)",
    subtleBlur: "0 0 10px rgba(108, 99, 255, 0.1)",
  },
  components: {
    profilePicture: {
      shape: "circle",
      size: "120px",
      border: "2px solid #6C63FF",
      shadow: "0 8px 25px rgba(0, 0, 0, 0.4)",
      subtleAccentGlow: "0 0 10px rgba(108, 99, 255, 0.1)",
    },
    card: {
      backgroundColor: "#2B2B4A",
      padding: "32px",
      borderRadius: "8px",
      shadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      backgroundGradient: "linear-gradient(180deg, #2B2B4A 0%, #1A1A2E 100%)",
    },
    button: {
      primary: {
        backgroundColor: "#6C63FF",
        backgroundGradient: "linear-gradient(135deg, #6C63FF 0%, #8A83FF 100%)",
        textColor: "#FFFFFF",
        padding: "16px 24px",
        borderRadius: "8px",
        fontWeight: 600,
        hoverOpacity: 0.9,
        shadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      },
      secondary: {
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.2)",
        textColor: "#E0E0FF",
        padding: "16px 24px",
        borderRadius: "8px",
        fontWeight: 500,
        hoverBackgroundColor: "#3D3D60",
      },
    },
    inputField: {
      backgroundColor: "#3D3D60",
      textColor: "#E0E0FF",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      padding: "8px 16px",
      focusBorderColor: "#6C63FF",
      shadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    sectionDivider: {
      height: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      marginVertical: "32px",
    },
  },
  structure: {
    layout: {
      maxWidth: "800px",
      horizontalCentering: true,
      paddingDesktop: "48px",
      paddingMobile: "24px",
    },
    profileHeader: {
      alignment: "center",
      verticalSpacing: "32px",
    },
    contentSections: {
      arrangement: "vertical stack",
      gapBetweenSections: "48px",
    },
    metricsGrid: {
      columns: "2-3 (responsive)",
      gap: "24px",
    },
  },
  icons: {
    style: "outline",
    color: "#B0B0D0",
    size: "24px",
  },
  responsive: {
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    textScaling: "Decrease font sizes slightly on smaller screens",
    layoutAdaptation:
      "Switch from multi-column to single-column layout on smaller screens; adjust padding and margins.",
  },
};

export default clayTheme; 