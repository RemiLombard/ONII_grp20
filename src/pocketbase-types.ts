/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Reve = "reve",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ReveTypeOptions {
	"Cauchemar" = "Cauchemar",
	"Rêve" = "Rêve",
}

export enum ReveLucideOptions {
	"Oui" = "Oui",
	"Non" = "Non",
}

export enum ReveRecurrentOptions {
	"Oui" = "Oui",
	"Non" = "Non",
}

export enum ReveCategorieOptions {
	"Joie" = "Joie",
	"Peur" = "Peur",
	"Tristesse" = "Tristesse",
	"Colère" = "Colère",
	"Amour" = "Amour",
	"Famille" = "Famille",
	"Amis" = "Amis",
	"Loisirs" = "Loisirs",
	"Aventure" = "Aventure",
	"Fantastique" = "Fantastique",
	"Exploration" = "Exploration",
	"Voyage" = "Voyage",
	"Suspens" = "Suspens",
	"Historique" = "Historique",
	"Culture pop" = "Culture pop",
	"Spiritualité" = "Spiritualité",
}
export type ReveRecord = {
	categorie?: ReveCategorieOptions
	date?: IsoDateString
	excerpt?: string
	fullText?: string
	lucide?: ReveLucideOptions
	partage?: boolean
	recurrent?: ReveRecurrentOptions
	title?: string
	type?: ReveTypeOptions
	userId?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	firstName?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ReveResponse<Texpand = unknown> = Required<ReveRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	reve: ReveRecord
	users: UsersRecord
}

export type CollectionResponses = {
	reve: ReveResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'reve'): RecordService<ReveResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
