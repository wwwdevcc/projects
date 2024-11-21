import { AppShell, Burger, Button, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "@tanstack/react-router";
import classes from "./Layout.module.css";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <p style={{ userSelect: "none" }}>ProjectHub</p>
            <Group ml="xl" gap={8} visibleFrom="sm">
              <Button className={classes.control} component={Link} to="/">
                Home
              </Button>
              <Button
                className={classes.control}
                component={Link}
                to="/about"
                variant="light"
              >
                About
              </Button>
            </Group>
          </Group>
          <ThemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={24}>
        <Flex direction={{ base: "row" }} gap="xs" w="100%" justify="center">
          <Button
            className={classes.mobile_navbar_buttons}
            component={Link}
            to="/"
            style={{ flexBasis: "50%" }}
          >
            Home
          </Button>
          <Button
            className={classes.mobile_navbar_buttons}
            component={Link}
            to="/about"
            variant="light"
            style={{ flexBasis: "50%" }}
          >
            About
          </Button>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
