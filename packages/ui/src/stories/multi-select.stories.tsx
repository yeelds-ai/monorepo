import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { MultiSelect, type SelectOption } from "../components/multi-select";

const meta = {
    title: "Input/Multi select",
    component: MultiSelect,
    tags: ["autodocs"],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const CHAIN_OPTIONS: SelectOption<string>[] = [
    { label: "Ethereum", value: "ethereum" },
    { label: "Base", value: "base" },
    { label: "Arbitrum", value: "arbitrum" },
];

const STRATEGY_OPTIONS: SelectOption<string>[] = [
    { label: "Lending", value: "lending" },
    { label: "Vault", value: "vault" },
    { label: "Staking", value: "staking" },
];

const MESSAGES = {
    deselectAll: "Deselect all",
    noResults: "No results",
    searchPlaceholder: "Search",
    clear: "Clear",
};

function ControlledMultiSelect({
    label,
    options,
    initial = [],
    search,
    loading,
}: {
    label: string;
    options: SelectOption<string>[];
    initial?: SelectOption<string>[];
    search?: boolean;
    loading?: boolean;
}) {
    const [values, setValues] = useState(initial);
    return (
        <MultiSelect
            label={label}
            options={options}
            values={values}
            search={search}
            loading={loading}
            messages={MESSAGES}
            onChange={setValues}
        />
    );
}

export const Loading: Story = {
    render: () => (
        <ControlledMultiSelect label="Chains" options={CHAIN_OPTIONS} loading />
    ),
};

export const Unselected: Story = {
    render: () => (
        <ControlledMultiSelect label="Chains" options={CHAIN_OPTIONS} />
    ),
};

export const SingleSelected: Story = {
    render: () => (
        <ControlledMultiSelect
            label="Chains"
            options={CHAIN_OPTIONS}
            initial={[CHAIN_OPTIONS[0]]}
        />
    ),
};

export const MultipleSelected: Story = {
    render: () => (
        <ControlledMultiSelect
            label="Strategies"
            options={STRATEGY_OPTIONS}
            initial={[STRATEGY_OPTIONS[0], STRATEGY_OPTIONS[2]]}
        />
    ),
};

export const WithSearch: Story = {
    render: () => (
        <ControlledMultiSelect label="Chains" options={CHAIN_OPTIONS} search />
    ),
};
