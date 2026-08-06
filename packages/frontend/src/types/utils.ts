import type { NamespaceKeys, NestedKeyOf } from "next-intl";
import type { useTranslations } from "next-intl";
import type { Messages } from "next-intl";
import type { getTranslations } from "next-intl/server";

export type TranslationsType<
    T extends NamespaceKeys<Messages, NestedKeyOf<Messages>>,
> =
    | Awaited<ReturnType<typeof getTranslations<T>>>
    | ReturnType<typeof useTranslations<T>>;

export type TranslationsKeys<
    T extends NamespaceKeys<Messages, NestedKeyOf<Messages>>,
> = Parameters<TranslationsType<T>>[0];
