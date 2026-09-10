import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { type TabItem, Tabs } from "../components/tabs";

const meta = {
    title: "Navigation/Tabs",
    component: Tabs,
    tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

const RANGE_TABS: TabItem[] = [
    { id: "1m", label: "1M" },
    { id: "3m", label: "3M" },
    { id: "6m", label: "6M" },
    { id: "1y", label: "1Y" },
];

const VIEW_TABS: TabItem[] = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "settings", label: "Settings" },
];

function ControlledTabs({
    tabs,
    initialTab,
}: {
    tabs: TabItem[];
    initialTab?: string;
}) {
    const [activeTab, setActiveTab] = useState(initialTab ?? tabs[0].id);

    return (
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    );
}

export const Base: Story = {
    render: () => <ControlledTabs tabs={RANGE_TABS} />,
};

export const Views: Story = {
    render: () => <ControlledTabs tabs={VIEW_TABS} />,
};

export const PreselectedTab: Story = {
    render: () => <ControlledTabs tabs={RANGE_TABS} initialTab="1y" />,
};
