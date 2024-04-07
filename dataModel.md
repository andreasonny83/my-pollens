# MyPollen Data entities and access pattern

- [MyPollen Data entities and access pattern](#mypollen-data-entities-and-access-pattern)
    - [Entity Charts](#entity-charts)
    - [Access Patterns](#access-patterns)
  - [Legend](#legend)

### Entity Charts

User: A user must have a unique username and an email address

Pollen: A Pollen record must have a unique id and a pollenCode as well as other information related to the specific allergenic.

UserPollenEntry: User specific pollen entry. This record generated every time a user submit their data.

Entity | PK | SK | Attributes | Notes
-|-|-|-|-
User | U#<userId> | U#<userId> | entityType, displayName, userId, email | entityType is 'user'. userId must be unique.
Pollen | P#POLLEN_TYPE | P#<PollenId> | entityType, pollenCode, pollenType, displayName, family, indexCode, indexDisplayName, season, crossReaction | entityType is 'pollen'.
UserPollen | UP#<userId> | PD#<PollenDataId> | entityType, date, allergyLv, pollenId, pollenValue | entityType is 'user_pollen'.

**entityType** is an identifier used to categorise the items stored in the database. This will reflect the Entity column.

### Access Patterns

Get User for a given Username

Get Pollen for a given PollenId

Get list of available Pollens

Get User's Pollen entries

Create User

Create User Pollen entry

Update User

Access Pattern | Table / GSI | Parameters | Key Conditions | Notes
-|-|-|-|-
Get User for a given userId | table | userId | PK=U#<userId> and SK=U#<userId> | GetItem. Unique requirement on userId
Get Pollen for a given PollenId | table | pollenId | PK=P#POLLEN_TYPE and SK=P#<pollenId> | GetItem
Get list of available Pollens | table | - | PK=P#POLLEN_TYPE and SK begins_with "P#" | Query Operation
Get User's Pollen entries | table | userId | PK=UP#<userId> and SK begins_with "PD#" | Query Operation

## Legend

- U: User
- P: Pollen Entry
- UP: User's Pollen Entry
- PD: Pollen Data Entry