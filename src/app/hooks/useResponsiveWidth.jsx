import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function useResponsiveWidth(xl, lg, md, sm, xs) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));

    if (isXs) return xs
    if (isLg) return lg;
    if (isMd) return md;
    if (isSm) return sm;
    return xl;
}

export default useResponsiveWidth;