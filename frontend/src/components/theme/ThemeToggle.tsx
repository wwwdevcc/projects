import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleColorScheme} variant="outline">
      {computedColorScheme === "dark" ? (
        <Sun size="1.2rem" />
      ) : (
        <Moon size="1.2rem" />
      )}
    </Button>
  );
}
