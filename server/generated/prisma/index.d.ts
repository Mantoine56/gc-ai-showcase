
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectContact
 * 
 */
export type ProjectContact = $Result.DefaultSelection<Prisma.$ProjectContactPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CodeRequest
 * 
 */
export type CodeRequest = $Result.DefaultSelection<Prisma.$CodeRequestPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PrimaryUsers: {
  Employees: 'Employees',
  MembersOfPublic: 'MembersOfPublic',
  Both: 'Both',
  Neither: 'Neither'
};

export type PrimaryUsers = (typeof PrimaryUsers)[keyof typeof PrimaryUsers]


export const DevelopedBy: {
  Government: 'Government',
  Vendor: 'Vendor',
  Other: 'Other'
};

export type DevelopedBy = (typeof DevelopedBy)[keyof typeof DevelopedBy]


export const ProjectStatus: {
  InDevelopment: 'InDevelopment',
  InProduction: 'InProduction',
  Retired: 'Retired'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const ModerationState: {
  Draft: 'Draft',
  Submitted: 'Submitted',
  Approved: 'Approved',
  Published: 'Published',
  Archived: 'Archived'
};

export type ModerationState = (typeof ModerationState)[keyof typeof ModerationState]


export const ContactRole: {
  Primary: 'Primary',
  Technical: 'Technical',
  Business: 'Business'
};

export type ContactRole = (typeof ContactRole)[keyof typeof ContactRole]

}

export type PrimaryUsers = $Enums.PrimaryUsers

export const PrimaryUsers: typeof $Enums.PrimaryUsers

export type DevelopedBy = $Enums.DevelopedBy

export const DevelopedBy: typeof $Enums.DevelopedBy

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type ModerationState = $Enums.ModerationState

export const ModerationState: typeof $Enums.ModerationState

export type ContactRole = $Enums.ContactRole

export const ContactRole: typeof $Enums.ContactRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectContact`: Exposes CRUD operations for the **ProjectContact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectContacts
    * const projectContacts = await prisma.projectContact.findMany()
    * ```
    */
  get projectContact(): Prisma.ProjectContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.codeRequest`: Exposes CRUD operations for the **CodeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CodeRequests
    * const codeRequests = await prisma.codeRequest.findMany()
    * ```
    */
  get codeRequest(): Prisma.CodeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    ProjectContact: 'ProjectContact',
    Organization: 'Organization',
    User: 'User',
    CodeRequest: 'CodeRequest',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "projectContact" | "organization" | "user" | "codeRequest" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectContact: {
        payload: Prisma.$ProjectContactPayload<ExtArgs>
        fields: Prisma.ProjectContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>
          }
          findFirst: {
            args: Prisma.ProjectContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>
          }
          findMany: {
            args: Prisma.ProjectContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>[]
          }
          create: {
            args: Prisma.ProjectContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>
          }
          createMany: {
            args: Prisma.ProjectContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>[]
          }
          delete: {
            args: Prisma.ProjectContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>
          }
          update: {
            args: Prisma.ProjectContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>
          }
          deleteMany: {
            args: Prisma.ProjectContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>[]
          }
          upsert: {
            args: Prisma.ProjectContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectContactPayload>
          }
          aggregate: {
            args: Prisma.ProjectContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectContact>
          }
          groupBy: {
            args: Prisma.ProjectContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectContactCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectContactCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CodeRequest: {
        payload: Prisma.$CodeRequestPayload<ExtArgs>
        fields: Prisma.CodeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>
          }
          findFirst: {
            args: Prisma.CodeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>
          }
          findMany: {
            args: Prisma.CodeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>[]
          }
          create: {
            args: Prisma.CodeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>
          }
          createMany: {
            args: Prisma.CodeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>[]
          }
          delete: {
            args: Prisma.CodeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>
          }
          update: {
            args: Prisma.CodeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>
          }
          deleteMany: {
            args: Prisma.CodeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CodeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>[]
          }
          upsert: {
            args: Prisma.CodeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeRequestPayload>
          }
          aggregate: {
            args: Prisma.CodeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCodeRequest>
          }
          groupBy: {
            args: Prisma.CodeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<CodeRequestCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    projectContact?: ProjectContactOmit
    organization?: OrganizationOmit
    user?: UserOmit
    codeRequest?: CodeRequestOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    codeRequests: number
    contacts: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    codeRequests?: boolean | ProjectCountOutputTypeCountCodeRequestsArgs
    contacts?: boolean | ProjectCountOutputTypeCountContactsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountCodeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeRequestWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectContactWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    projects: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | OrganizationCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    statusYear: number | null
  }

  export type ProjectSumAggregateOutputType = {
    statusYear: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    aiRegisterId: string | null
    nameEN: string | null
    nameFR: string | null
    serviceInventoryId: string | null
    organizationId: string | null
    descriptionEN: string | null
    descriptionFR: string | null
    primaryUsers: $Enums.PrimaryUsers | null
    developedBy: $Enums.DevelopedBy | null
    vendorName: string | null
    status: $Enums.ProjectStatus | null
    statusYear: number | null
    capabilitiesEN: string | null
    capabilitiesFR: string | null
    isAutomatedDecisionSystem: boolean | null
    openGovAiaId: string | null
    dataSourcesEN: string | null
    dataSourcesFR: string | null
    involvesPersonalInfo: boolean | null
    personalInformationBanksEN: string | null
    personalInformationBanksFR: string | null
    hasUserNotification: boolean | null
    atipRequestRefsEN: string | null
    atipRequestRefsFR: string | null
    outcomesEN: string | null
    outcomesFR: string | null
    source1: string | null
    source2: string | null
    moderationState: $Enums.ModerationState | null
    featured: boolean | null
    isOpenSource: boolean | null
    githubUrl: string | null
    createdBy: string | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    aiRegisterId: string | null
    nameEN: string | null
    nameFR: string | null
    serviceInventoryId: string | null
    organizationId: string | null
    descriptionEN: string | null
    descriptionFR: string | null
    primaryUsers: $Enums.PrimaryUsers | null
    developedBy: $Enums.DevelopedBy | null
    vendorName: string | null
    status: $Enums.ProjectStatus | null
    statusYear: number | null
    capabilitiesEN: string | null
    capabilitiesFR: string | null
    isAutomatedDecisionSystem: boolean | null
    openGovAiaId: string | null
    dataSourcesEN: string | null
    dataSourcesFR: string | null
    involvesPersonalInfo: boolean | null
    personalInformationBanksEN: string | null
    personalInformationBanksFR: string | null
    hasUserNotification: boolean | null
    atipRequestRefsEN: string | null
    atipRequestRefsFR: string | null
    outcomesEN: string | null
    outcomesFR: string | null
    source1: string | null
    source2: string | null
    moderationState: $Enums.ModerationState | null
    featured: boolean | null
    isOpenSource: boolean | null
    githubUrl: string | null
    createdBy: string | null
    updatedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    aiRegisterId: number
    nameEN: number
    nameFR: number
    serviceInventoryId: number
    organizationId: number
    descriptionEN: number
    descriptionFR: number
    primaryUsers: number
    developedBy: number
    vendorName: number
    status: number
    statusYear: number
    capabilitiesEN: number
    capabilitiesFR: number
    isAutomatedDecisionSystem: number
    openGovAiaId: number
    dataSourcesEN: number
    dataSourcesFR: number
    involvesPersonalInfo: number
    personalInformationBanksEN: number
    personalInformationBanksFR: number
    hasUserNotification: number
    atipRequestRefsEN: number
    atipRequestRefsFR: number
    outcomesEN: number
    outcomesFR: number
    source1: number
    source2: number
    moderationState: number
    featured: number
    isOpenSource: number
    githubUrl: number
    createdBy: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    statusYear?: true
  }

  export type ProjectSumAggregateInputType = {
    statusYear?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    aiRegisterId?: true
    nameEN?: true
    nameFR?: true
    serviceInventoryId?: true
    organizationId?: true
    descriptionEN?: true
    descriptionFR?: true
    primaryUsers?: true
    developedBy?: true
    vendorName?: true
    status?: true
    statusYear?: true
    capabilitiesEN?: true
    capabilitiesFR?: true
    isAutomatedDecisionSystem?: true
    openGovAiaId?: true
    dataSourcesEN?: true
    dataSourcesFR?: true
    involvesPersonalInfo?: true
    personalInformationBanksEN?: true
    personalInformationBanksFR?: true
    hasUserNotification?: true
    atipRequestRefsEN?: true
    atipRequestRefsFR?: true
    outcomesEN?: true
    outcomesFR?: true
    source1?: true
    source2?: true
    moderationState?: true
    featured?: true
    isOpenSource?: true
    githubUrl?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    aiRegisterId?: true
    nameEN?: true
    nameFR?: true
    serviceInventoryId?: true
    organizationId?: true
    descriptionEN?: true
    descriptionFR?: true
    primaryUsers?: true
    developedBy?: true
    vendorName?: true
    status?: true
    statusYear?: true
    capabilitiesEN?: true
    capabilitiesFR?: true
    isAutomatedDecisionSystem?: true
    openGovAiaId?: true
    dataSourcesEN?: true
    dataSourcesFR?: true
    involvesPersonalInfo?: true
    personalInformationBanksEN?: true
    personalInformationBanksFR?: true
    hasUserNotification?: true
    atipRequestRefsEN?: true
    atipRequestRefsFR?: true
    outcomesEN?: true
    outcomesFR?: true
    source1?: true
    source2?: true
    moderationState?: true
    featured?: true
    isOpenSource?: true
    githubUrl?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    aiRegisterId?: true
    nameEN?: true
    nameFR?: true
    serviceInventoryId?: true
    organizationId?: true
    descriptionEN?: true
    descriptionFR?: true
    primaryUsers?: true
    developedBy?: true
    vendorName?: true
    status?: true
    statusYear?: true
    capabilitiesEN?: true
    capabilitiesFR?: true
    isAutomatedDecisionSystem?: true
    openGovAiaId?: true
    dataSourcesEN?: true
    dataSourcesFR?: true
    involvesPersonalInfo?: true
    personalInformationBanksEN?: true
    personalInformationBanksFR?: true
    hasUserNotification?: true
    atipRequestRefsEN?: true
    atipRequestRefsFR?: true
    outcomesEN?: true
    outcomesFR?: true
    source1?: true
    source2?: true
    moderationState?: true
    featured?: true
    isOpenSource?: true
    githubUrl?: true
    createdBy?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    aiRegisterId: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId: string | null
    organizationId: string
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName: string | null
    status: $Enums.ProjectStatus
    statusYear: number | null
    capabilitiesEN: string | null
    capabilitiesFR: string | null
    isAutomatedDecisionSystem: boolean
    openGovAiaId: string | null
    dataSourcesEN: string | null
    dataSourcesFR: string | null
    involvesPersonalInfo: boolean
    personalInformationBanksEN: string | null
    personalInformationBanksFR: string | null
    hasUserNotification: boolean
    atipRequestRefsEN: string | null
    atipRequestRefsFR: string | null
    outcomesEN: string | null
    outcomesFR: string | null
    source1: string | null
    source2: string | null
    moderationState: $Enums.ModerationState
    featured: boolean
    isOpenSource: boolean
    githubUrl: string | null
    createdBy: string | null
    updatedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aiRegisterId?: boolean
    nameEN?: boolean
    nameFR?: boolean
    serviceInventoryId?: boolean
    organizationId?: boolean
    descriptionEN?: boolean
    descriptionFR?: boolean
    primaryUsers?: boolean
    developedBy?: boolean
    vendorName?: boolean
    status?: boolean
    statusYear?: boolean
    capabilitiesEN?: boolean
    capabilitiesFR?: boolean
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: boolean
    dataSourcesEN?: boolean
    dataSourcesFR?: boolean
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: boolean
    personalInformationBanksFR?: boolean
    hasUserNotification?: boolean
    atipRequestRefsEN?: boolean
    atipRequestRefsFR?: boolean
    outcomesEN?: boolean
    outcomesFR?: boolean
    source1?: boolean
    source2?: boolean
    moderationState?: boolean
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    codeRequests?: boolean | Project$codeRequestsArgs<ExtArgs>
    contacts?: boolean | Project$contactsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aiRegisterId?: boolean
    nameEN?: boolean
    nameFR?: boolean
    serviceInventoryId?: boolean
    organizationId?: boolean
    descriptionEN?: boolean
    descriptionFR?: boolean
    primaryUsers?: boolean
    developedBy?: boolean
    vendorName?: boolean
    status?: boolean
    statusYear?: boolean
    capabilitiesEN?: boolean
    capabilitiesFR?: boolean
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: boolean
    dataSourcesEN?: boolean
    dataSourcesFR?: boolean
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: boolean
    personalInformationBanksFR?: boolean
    hasUserNotification?: boolean
    atipRequestRefsEN?: boolean
    atipRequestRefsFR?: boolean
    outcomesEN?: boolean
    outcomesFR?: boolean
    source1?: boolean
    source2?: boolean
    moderationState?: boolean
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aiRegisterId?: boolean
    nameEN?: boolean
    nameFR?: boolean
    serviceInventoryId?: boolean
    organizationId?: boolean
    descriptionEN?: boolean
    descriptionFR?: boolean
    primaryUsers?: boolean
    developedBy?: boolean
    vendorName?: boolean
    status?: boolean
    statusYear?: boolean
    capabilitiesEN?: boolean
    capabilitiesFR?: boolean
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: boolean
    dataSourcesEN?: boolean
    dataSourcesFR?: boolean
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: boolean
    personalInformationBanksFR?: boolean
    hasUserNotification?: boolean
    atipRequestRefsEN?: boolean
    atipRequestRefsFR?: boolean
    outcomesEN?: boolean
    outcomesFR?: boolean
    source1?: boolean
    source2?: boolean
    moderationState?: boolean
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    aiRegisterId?: boolean
    nameEN?: boolean
    nameFR?: boolean
    serviceInventoryId?: boolean
    organizationId?: boolean
    descriptionEN?: boolean
    descriptionFR?: boolean
    primaryUsers?: boolean
    developedBy?: boolean
    vendorName?: boolean
    status?: boolean
    statusYear?: boolean
    capabilitiesEN?: boolean
    capabilitiesFR?: boolean
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: boolean
    dataSourcesEN?: boolean
    dataSourcesFR?: boolean
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: boolean
    personalInformationBanksFR?: boolean
    hasUserNotification?: boolean
    atipRequestRefsEN?: boolean
    atipRequestRefsFR?: boolean
    outcomesEN?: boolean
    outcomesFR?: boolean
    source1?: boolean
    source2?: boolean
    moderationState?: boolean
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aiRegisterId" | "nameEN" | "nameFR" | "serviceInventoryId" | "organizationId" | "descriptionEN" | "descriptionFR" | "primaryUsers" | "developedBy" | "vendorName" | "status" | "statusYear" | "capabilitiesEN" | "capabilitiesFR" | "isAutomatedDecisionSystem" | "openGovAiaId" | "dataSourcesEN" | "dataSourcesFR" | "involvesPersonalInfo" | "personalInformationBanksEN" | "personalInformationBanksFR" | "hasUserNotification" | "atipRequestRefsEN" | "atipRequestRefsFR" | "outcomesEN" | "outcomesFR" | "source1" | "source2" | "moderationState" | "featured" | "isOpenSource" | "githubUrl" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    codeRequests?: boolean | Project$codeRequestsArgs<ExtArgs>
    contacts?: boolean | Project$contactsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      codeRequests: Prisma.$CodeRequestPayload<ExtArgs>[]
      contacts: Prisma.$ProjectContactPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      aiRegisterId: string | null
      nameEN: string
      nameFR: string
      serviceInventoryId: string | null
      organizationId: string
      descriptionEN: string
      descriptionFR: string
      primaryUsers: $Enums.PrimaryUsers
      developedBy: $Enums.DevelopedBy
      vendorName: string | null
      status: $Enums.ProjectStatus
      statusYear: number | null
      capabilitiesEN: string | null
      capabilitiesFR: string | null
      isAutomatedDecisionSystem: boolean
      openGovAiaId: string | null
      dataSourcesEN: string | null
      dataSourcesFR: string | null
      involvesPersonalInfo: boolean
      personalInformationBanksEN: string | null
      personalInformationBanksFR: string | null
      hasUserNotification: boolean
      atipRequestRefsEN: string | null
      atipRequestRefsFR: string | null
      outcomesEN: string | null
      outcomesFR: string | null
      source1: string | null
      source2: string | null
      moderationState: $Enums.ModerationState
      featured: boolean
      isOpenSource: boolean
      githubUrl: string | null
      createdBy: string | null
      updatedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    codeRequests<T extends Project$codeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Project$codeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contacts<T extends Project$contactsArgs<ExtArgs> = {}>(args?: Subset<T, Project$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly aiRegisterId: FieldRef<"Project", 'String'>
    readonly nameEN: FieldRef<"Project", 'String'>
    readonly nameFR: FieldRef<"Project", 'String'>
    readonly serviceInventoryId: FieldRef<"Project", 'String'>
    readonly organizationId: FieldRef<"Project", 'String'>
    readonly descriptionEN: FieldRef<"Project", 'String'>
    readonly descriptionFR: FieldRef<"Project", 'String'>
    readonly primaryUsers: FieldRef<"Project", 'PrimaryUsers'>
    readonly developedBy: FieldRef<"Project", 'DevelopedBy'>
    readonly vendorName: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly statusYear: FieldRef<"Project", 'Int'>
    readonly capabilitiesEN: FieldRef<"Project", 'String'>
    readonly capabilitiesFR: FieldRef<"Project", 'String'>
    readonly isAutomatedDecisionSystem: FieldRef<"Project", 'Boolean'>
    readonly openGovAiaId: FieldRef<"Project", 'String'>
    readonly dataSourcesEN: FieldRef<"Project", 'String'>
    readonly dataSourcesFR: FieldRef<"Project", 'String'>
    readonly involvesPersonalInfo: FieldRef<"Project", 'Boolean'>
    readonly personalInformationBanksEN: FieldRef<"Project", 'String'>
    readonly personalInformationBanksFR: FieldRef<"Project", 'String'>
    readonly hasUserNotification: FieldRef<"Project", 'Boolean'>
    readonly atipRequestRefsEN: FieldRef<"Project", 'String'>
    readonly atipRequestRefsFR: FieldRef<"Project", 'String'>
    readonly outcomesEN: FieldRef<"Project", 'String'>
    readonly outcomesFR: FieldRef<"Project", 'String'>
    readonly source1: FieldRef<"Project", 'String'>
    readonly source2: FieldRef<"Project", 'String'>
    readonly moderationState: FieldRef<"Project", 'ModerationState'>
    readonly featured: FieldRef<"Project", 'Boolean'>
    readonly isOpenSource: FieldRef<"Project", 'Boolean'>
    readonly githubUrl: FieldRef<"Project", 'String'>
    readonly createdBy: FieldRef<"Project", 'String'>
    readonly updatedBy: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.codeRequests
   */
  export type Project$codeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    where?: CodeRequestWhereInput
    orderBy?: CodeRequestOrderByWithRelationInput | CodeRequestOrderByWithRelationInput[]
    cursor?: CodeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CodeRequestScalarFieldEnum | CodeRequestScalarFieldEnum[]
  }

  /**
   * Project.contacts
   */
  export type Project$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    where?: ProjectContactWhereInput
    orderBy?: ProjectContactOrderByWithRelationInput | ProjectContactOrderByWithRelationInput[]
    cursor?: ProjectContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectContactScalarFieldEnum | ProjectContactScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectContact
   */

  export type AggregateProjectContact = {
    _count: ProjectContactCountAggregateOutputType | null
    _min: ProjectContactMinAggregateOutputType | null
    _max: ProjectContactMaxAggregateOutputType | null
  }

  export type ProjectContactMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    email: string | null
    role: $Enums.ContactRole | null
    title: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectContactMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    email: string | null
    role: $Enums.ContactRole | null
    title: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectContactCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    email: number
    role: number
    title: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectContactMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    email?: true
    role?: true
    title?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectContactMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    email?: true
    role?: true
    title?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectContactCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    email?: true
    role?: true
    title?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectContact to aggregate.
     */
    where?: ProjectContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContacts to fetch.
     */
    orderBy?: ProjectContactOrderByWithRelationInput | ProjectContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectContacts
    **/
    _count?: true | ProjectContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectContactMaxAggregateInputType
  }

  export type GetProjectContactAggregateType<T extends ProjectContactAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectContact[P]>
      : GetScalarType<T[P], AggregateProjectContact[P]>
  }




  export type ProjectContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectContactWhereInput
    orderBy?: ProjectContactOrderByWithAggregationInput | ProjectContactOrderByWithAggregationInput[]
    by: ProjectContactScalarFieldEnum[] | ProjectContactScalarFieldEnum
    having?: ProjectContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectContactCountAggregateInputType | true
    _min?: ProjectContactMinAggregateInputType
    _max?: ProjectContactMaxAggregateInputType
  }

  export type ProjectContactGroupByOutputType = {
    id: string
    projectId: string
    name: string
    email: string
    role: $Enums.ContactRole
    title: string | null
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectContactCountAggregateOutputType | null
    _min: ProjectContactMinAggregateOutputType | null
    _max: ProjectContactMaxAggregateOutputType | null
  }

  type GetProjectContactGroupByPayload<T extends ProjectContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectContactGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectContactGroupByOutputType[P]>
        }
      >
    >


  export type ProjectContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    title?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectContact"]>

  export type ProjectContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    title?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectContact"]>

  export type ProjectContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    title?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectContact"]>

  export type ProjectContactSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    title?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "email" | "role" | "title" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["projectContact"]>
  export type ProjectContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectContact"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      email: string
      role: $Enums.ContactRole
      title: string | null
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectContact"]>
    composites: {}
  }

  type ProjectContactGetPayload<S extends boolean | null | undefined | ProjectContactDefaultArgs> = $Result.GetResult<Prisma.$ProjectContactPayload, S>

  type ProjectContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectContactCountAggregateInputType | true
    }

  export interface ProjectContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectContact'], meta: { name: 'ProjectContact' } }
    /**
     * Find zero or one ProjectContact that matches the filter.
     * @param {ProjectContactFindUniqueArgs} args - Arguments to find a ProjectContact
     * @example
     * // Get one ProjectContact
     * const projectContact = await prisma.projectContact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectContactFindUniqueArgs>(args: SelectSubset<T, ProjectContactFindUniqueArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectContact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectContactFindUniqueOrThrowArgs} args - Arguments to find a ProjectContact
     * @example
     * // Get one ProjectContact
     * const projectContact = await prisma.projectContact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectContact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactFindFirstArgs} args - Arguments to find a ProjectContact
     * @example
     * // Get one ProjectContact
     * const projectContact = await prisma.projectContact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectContactFindFirstArgs>(args?: SelectSubset<T, ProjectContactFindFirstArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectContact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactFindFirstOrThrowArgs} args - Arguments to find a ProjectContact
     * @example
     * // Get one ProjectContact
     * const projectContact = await prisma.projectContact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectContacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectContacts
     * const projectContacts = await prisma.projectContact.findMany()
     * 
     * // Get first 10 ProjectContacts
     * const projectContacts = await prisma.projectContact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectContactWithIdOnly = await prisma.projectContact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectContactFindManyArgs>(args?: SelectSubset<T, ProjectContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectContact.
     * @param {ProjectContactCreateArgs} args - Arguments to create a ProjectContact.
     * @example
     * // Create one ProjectContact
     * const ProjectContact = await prisma.projectContact.create({
     *   data: {
     *     // ... data to create a ProjectContact
     *   }
     * })
     * 
     */
    create<T extends ProjectContactCreateArgs>(args: SelectSubset<T, ProjectContactCreateArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectContacts.
     * @param {ProjectContactCreateManyArgs} args - Arguments to create many ProjectContacts.
     * @example
     * // Create many ProjectContacts
     * const projectContact = await prisma.projectContact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectContactCreateManyArgs>(args?: SelectSubset<T, ProjectContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectContacts and returns the data saved in the database.
     * @param {ProjectContactCreateManyAndReturnArgs} args - Arguments to create many ProjectContacts.
     * @example
     * // Create many ProjectContacts
     * const projectContact = await prisma.projectContact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectContacts and only return the `id`
     * const projectContactWithIdOnly = await prisma.projectContact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectContact.
     * @param {ProjectContactDeleteArgs} args - Arguments to delete one ProjectContact.
     * @example
     * // Delete one ProjectContact
     * const ProjectContact = await prisma.projectContact.delete({
     *   where: {
     *     // ... filter to delete one ProjectContact
     *   }
     * })
     * 
     */
    delete<T extends ProjectContactDeleteArgs>(args: SelectSubset<T, ProjectContactDeleteArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectContact.
     * @param {ProjectContactUpdateArgs} args - Arguments to update one ProjectContact.
     * @example
     * // Update one ProjectContact
     * const projectContact = await prisma.projectContact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectContactUpdateArgs>(args: SelectSubset<T, ProjectContactUpdateArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectContacts.
     * @param {ProjectContactDeleteManyArgs} args - Arguments to filter ProjectContacts to delete.
     * @example
     * // Delete a few ProjectContacts
     * const { count } = await prisma.projectContact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectContactDeleteManyArgs>(args?: SelectSubset<T, ProjectContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectContacts
     * const projectContact = await prisma.projectContact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectContactUpdateManyArgs>(args: SelectSubset<T, ProjectContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectContacts and returns the data updated in the database.
     * @param {ProjectContactUpdateManyAndReturnArgs} args - Arguments to update many ProjectContacts.
     * @example
     * // Update many ProjectContacts
     * const projectContact = await prisma.projectContact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectContacts and only return the `id`
     * const projectContactWithIdOnly = await prisma.projectContact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectContact.
     * @param {ProjectContactUpsertArgs} args - Arguments to update or create a ProjectContact.
     * @example
     * // Update or create a ProjectContact
     * const projectContact = await prisma.projectContact.upsert({
     *   create: {
     *     // ... data to create a ProjectContact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectContact we want to update
     *   }
     * })
     */
    upsert<T extends ProjectContactUpsertArgs>(args: SelectSubset<T, ProjectContactUpsertArgs<ExtArgs>>): Prisma__ProjectContactClient<$Result.GetResult<Prisma.$ProjectContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectContacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactCountArgs} args - Arguments to filter ProjectContacts to count.
     * @example
     * // Count the number of ProjectContacts
     * const count = await prisma.projectContact.count({
     *   where: {
     *     // ... the filter for the ProjectContacts we want to count
     *   }
     * })
    **/
    count<T extends ProjectContactCountArgs>(
      args?: Subset<T, ProjectContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectContactAggregateArgs>(args: Subset<T, ProjectContactAggregateArgs>): Prisma.PrismaPromise<GetProjectContactAggregateType<T>>

    /**
     * Group by ProjectContact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectContactGroupByArgs['orderBy'] }
        : { orderBy?: ProjectContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectContact model
   */
  readonly fields: ProjectContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectContact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectContact model
   */
  interface ProjectContactFieldRefs {
    readonly id: FieldRef<"ProjectContact", 'String'>
    readonly projectId: FieldRef<"ProjectContact", 'String'>
    readonly name: FieldRef<"ProjectContact", 'String'>
    readonly email: FieldRef<"ProjectContact", 'String'>
    readonly role: FieldRef<"ProjectContact", 'ContactRole'>
    readonly title: FieldRef<"ProjectContact", 'String'>
    readonly phone: FieldRef<"ProjectContact", 'String'>
    readonly createdAt: FieldRef<"ProjectContact", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectContact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectContact findUnique
   */
  export type ProjectContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContact to fetch.
     */
    where: ProjectContactWhereUniqueInput
  }

  /**
   * ProjectContact findUniqueOrThrow
   */
  export type ProjectContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContact to fetch.
     */
    where: ProjectContactWhereUniqueInput
  }

  /**
   * ProjectContact findFirst
   */
  export type ProjectContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContact to fetch.
     */
    where?: ProjectContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContacts to fetch.
     */
    orderBy?: ProjectContactOrderByWithRelationInput | ProjectContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectContacts.
     */
    cursor?: ProjectContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectContacts.
     */
    distinct?: ProjectContactScalarFieldEnum | ProjectContactScalarFieldEnum[]
  }

  /**
   * ProjectContact findFirstOrThrow
   */
  export type ProjectContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContact to fetch.
     */
    where?: ProjectContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContacts to fetch.
     */
    orderBy?: ProjectContactOrderByWithRelationInput | ProjectContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectContacts.
     */
    cursor?: ProjectContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectContacts.
     */
    distinct?: ProjectContactScalarFieldEnum | ProjectContactScalarFieldEnum[]
  }

  /**
   * ProjectContact findMany
   */
  export type ProjectContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * Filter, which ProjectContacts to fetch.
     */
    where?: ProjectContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectContacts to fetch.
     */
    orderBy?: ProjectContactOrderByWithRelationInput | ProjectContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectContacts.
     */
    cursor?: ProjectContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectContacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectContacts.
     */
    skip?: number
    distinct?: ProjectContactScalarFieldEnum | ProjectContactScalarFieldEnum[]
  }

  /**
   * ProjectContact create
   */
  export type ProjectContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectContact.
     */
    data: XOR<ProjectContactCreateInput, ProjectContactUncheckedCreateInput>
  }

  /**
   * ProjectContact createMany
   */
  export type ProjectContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectContacts.
     */
    data: ProjectContactCreateManyInput | ProjectContactCreateManyInput[]
  }

  /**
   * ProjectContact createManyAndReturn
   */
  export type ProjectContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectContacts.
     */
    data: ProjectContactCreateManyInput | ProjectContactCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectContact update
   */
  export type ProjectContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectContact.
     */
    data: XOR<ProjectContactUpdateInput, ProjectContactUncheckedUpdateInput>
    /**
     * Choose, which ProjectContact to update.
     */
    where: ProjectContactWhereUniqueInput
  }

  /**
   * ProjectContact updateMany
   */
  export type ProjectContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectContacts.
     */
    data: XOR<ProjectContactUpdateManyMutationInput, ProjectContactUncheckedUpdateManyInput>
    /**
     * Filter which ProjectContacts to update
     */
    where?: ProjectContactWhereInput
    /**
     * Limit how many ProjectContacts to update.
     */
    limit?: number
  }

  /**
   * ProjectContact updateManyAndReturn
   */
  export type ProjectContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * The data used to update ProjectContacts.
     */
    data: XOR<ProjectContactUpdateManyMutationInput, ProjectContactUncheckedUpdateManyInput>
    /**
     * Filter which ProjectContacts to update
     */
    where?: ProjectContactWhereInput
    /**
     * Limit how many ProjectContacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectContact upsert
   */
  export type ProjectContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectContact to update in case it exists.
     */
    where: ProjectContactWhereUniqueInput
    /**
     * In case the ProjectContact found by the `where` argument doesn't exist, create a new ProjectContact with this data.
     */
    create: XOR<ProjectContactCreateInput, ProjectContactUncheckedCreateInput>
    /**
     * In case the ProjectContact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectContactUpdateInput, ProjectContactUncheckedUpdateInput>
  }

  /**
   * ProjectContact delete
   */
  export type ProjectContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
    /**
     * Filter which ProjectContact to delete.
     */
    where: ProjectContactWhereUniqueInput
  }

  /**
   * ProjectContact deleteMany
   */
  export type ProjectContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectContacts to delete
     */
    where?: ProjectContactWhereInput
    /**
     * Limit how many ProjectContacts to delete.
     */
    limit?: number
  }

  /**
   * ProjectContact without action
   */
  export type ProjectContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectContact
     */
    select?: ProjectContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectContact
     */
    omit?: ProjectContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectContactInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    nameEN: string | null
    nameFR: string | null
    acronym: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    nameEN: string | null
    nameFR: string | null
    acronym: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    nameEN: number
    nameFR: number
    acronym: number
    url: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    nameEN?: true
    nameFR?: true
    acronym?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    nameEN?: true
    nameFR?: true
    acronym?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    nameEN?: true
    nameFR?: true
    acronym?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    nameEN: string
    nameFR: string
    acronym: string | null
    url: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nameEN?: boolean
    nameFR?: boolean
    acronym?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | Organization$projectsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nameEN?: boolean
    nameFR?: boolean
    acronym?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nameEN?: boolean
    nameFR?: boolean
    acronym?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    nameEN?: boolean
    nameFR?: boolean
    acronym?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nameEN" | "nameFR" | "acronym" | "url" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | Organization$projectsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nameEN: string
      nameFR: string
      acronym: string | null
      url: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends Organization$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly nameEN: FieldRef<"Organization", 'String'>
    readonly nameFR: FieldRef<"Organization", 'String'>
    readonly acronym: FieldRef<"Organization", 'String'>
    readonly url: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.projects
   */
  export type Organization$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    displayName: string | null
    roles: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    displayName: string | null
    roles: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    displayName: number
    roles: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    displayName?: true
    roles?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    displayName?: true
    roles?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    displayName?: true
    roles?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    displayName: string
    roles: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    displayName?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    displayName?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    displayName?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    displayName?: boolean
    roles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "displayName" | "roles" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      displayName: string
      roles: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly roles: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CodeRequest
   */

  export type AggregateCodeRequest = {
    _count: CodeRequestCountAggregateOutputType | null
    _min: CodeRequestMinAggregateOutputType | null
    _max: CodeRequestMaxAggregateOutputType | null
  }

  export type CodeRequestMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    requesterId: string | null
    requesterEmail: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CodeRequestMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    requesterId: string | null
    requesterEmail: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CodeRequestCountAggregateOutputType = {
    id: number
    projectId: number
    requesterId: number
    requesterEmail: number
    message: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CodeRequestMinAggregateInputType = {
    id?: true
    projectId?: true
    requesterId?: true
    requesterEmail?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CodeRequestMaxAggregateInputType = {
    id?: true
    projectId?: true
    requesterId?: true
    requesterEmail?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CodeRequestCountAggregateInputType = {
    id?: true
    projectId?: true
    requesterId?: true
    requesterEmail?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CodeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodeRequest to aggregate.
     */
    where?: CodeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeRequests to fetch.
     */
    orderBy?: CodeRequestOrderByWithRelationInput | CodeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CodeRequests
    **/
    _count?: true | CodeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodeRequestMaxAggregateInputType
  }

  export type GetCodeRequestAggregateType<T extends CodeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateCodeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCodeRequest[P]>
      : GetScalarType<T[P], AggregateCodeRequest[P]>
  }




  export type CodeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeRequestWhereInput
    orderBy?: CodeRequestOrderByWithAggregationInput | CodeRequestOrderByWithAggregationInput[]
    by: CodeRequestScalarFieldEnum[] | CodeRequestScalarFieldEnum
    having?: CodeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodeRequestCountAggregateInputType | true
    _min?: CodeRequestMinAggregateInputType
    _max?: CodeRequestMaxAggregateInputType
  }

  export type CodeRequestGroupByOutputType = {
    id: string
    projectId: string
    requesterId: string | null
    requesterEmail: string
    message: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: CodeRequestCountAggregateOutputType | null
    _min: CodeRequestMinAggregateOutputType | null
    _max: CodeRequestMaxAggregateOutputType | null
  }

  type GetCodeRequestGroupByPayload<T extends CodeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], CodeRequestGroupByOutputType[P]>
        }
      >
    >


  export type CodeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    requesterId?: boolean
    requesterEmail?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeRequest"]>

  export type CodeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    requesterId?: boolean
    requesterEmail?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeRequest"]>

  export type CodeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    requesterId?: boolean
    requesterEmail?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeRequest"]>

  export type CodeRequestSelectScalar = {
    id?: boolean
    projectId?: boolean
    requesterId?: boolean
    requesterEmail?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CodeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "requesterId" | "requesterEmail" | "message" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["codeRequest"]>
  export type CodeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type CodeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type CodeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $CodeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CodeRequest"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      requesterId: string | null
      requesterEmail: string
      message: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["codeRequest"]>
    composites: {}
  }

  type CodeRequestGetPayload<S extends boolean | null | undefined | CodeRequestDefaultArgs> = $Result.GetResult<Prisma.$CodeRequestPayload, S>

  type CodeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CodeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CodeRequestCountAggregateInputType | true
    }

  export interface CodeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CodeRequest'], meta: { name: 'CodeRequest' } }
    /**
     * Find zero or one CodeRequest that matches the filter.
     * @param {CodeRequestFindUniqueArgs} args - Arguments to find a CodeRequest
     * @example
     * // Get one CodeRequest
     * const codeRequest = await prisma.codeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodeRequestFindUniqueArgs>(args: SelectSubset<T, CodeRequestFindUniqueArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CodeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CodeRequestFindUniqueOrThrowArgs} args - Arguments to find a CodeRequest
     * @example
     * // Get one CodeRequest
     * const codeRequest = await prisma.codeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, CodeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CodeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestFindFirstArgs} args - Arguments to find a CodeRequest
     * @example
     * // Get one CodeRequest
     * const codeRequest = await prisma.codeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodeRequestFindFirstArgs>(args?: SelectSubset<T, CodeRequestFindFirstArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CodeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestFindFirstOrThrowArgs} args - Arguments to find a CodeRequest
     * @example
     * // Get one CodeRequest
     * const codeRequest = await prisma.codeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, CodeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CodeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CodeRequests
     * const codeRequests = await prisma.codeRequest.findMany()
     * 
     * // Get first 10 CodeRequests
     * const codeRequests = await prisma.codeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codeRequestWithIdOnly = await prisma.codeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodeRequestFindManyArgs>(args?: SelectSubset<T, CodeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CodeRequest.
     * @param {CodeRequestCreateArgs} args - Arguments to create a CodeRequest.
     * @example
     * // Create one CodeRequest
     * const CodeRequest = await prisma.codeRequest.create({
     *   data: {
     *     // ... data to create a CodeRequest
     *   }
     * })
     * 
     */
    create<T extends CodeRequestCreateArgs>(args: SelectSubset<T, CodeRequestCreateArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CodeRequests.
     * @param {CodeRequestCreateManyArgs} args - Arguments to create many CodeRequests.
     * @example
     * // Create many CodeRequests
     * const codeRequest = await prisma.codeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodeRequestCreateManyArgs>(args?: SelectSubset<T, CodeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CodeRequests and returns the data saved in the database.
     * @param {CodeRequestCreateManyAndReturnArgs} args - Arguments to create many CodeRequests.
     * @example
     * // Create many CodeRequests
     * const codeRequest = await prisma.codeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CodeRequests and only return the `id`
     * const codeRequestWithIdOnly = await prisma.codeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, CodeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CodeRequest.
     * @param {CodeRequestDeleteArgs} args - Arguments to delete one CodeRequest.
     * @example
     * // Delete one CodeRequest
     * const CodeRequest = await prisma.codeRequest.delete({
     *   where: {
     *     // ... filter to delete one CodeRequest
     *   }
     * })
     * 
     */
    delete<T extends CodeRequestDeleteArgs>(args: SelectSubset<T, CodeRequestDeleteArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CodeRequest.
     * @param {CodeRequestUpdateArgs} args - Arguments to update one CodeRequest.
     * @example
     * // Update one CodeRequest
     * const codeRequest = await prisma.codeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodeRequestUpdateArgs>(args: SelectSubset<T, CodeRequestUpdateArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CodeRequests.
     * @param {CodeRequestDeleteManyArgs} args - Arguments to filter CodeRequests to delete.
     * @example
     * // Delete a few CodeRequests
     * const { count } = await prisma.codeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodeRequestDeleteManyArgs>(args?: SelectSubset<T, CodeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CodeRequests
     * const codeRequest = await prisma.codeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodeRequestUpdateManyArgs>(args: SelectSubset<T, CodeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodeRequests and returns the data updated in the database.
     * @param {CodeRequestUpdateManyAndReturnArgs} args - Arguments to update many CodeRequests.
     * @example
     * // Update many CodeRequests
     * const codeRequest = await prisma.codeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CodeRequests and only return the `id`
     * const codeRequestWithIdOnly = await prisma.codeRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CodeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, CodeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CodeRequest.
     * @param {CodeRequestUpsertArgs} args - Arguments to update or create a CodeRequest.
     * @example
     * // Update or create a CodeRequest
     * const codeRequest = await prisma.codeRequest.upsert({
     *   create: {
     *     // ... data to create a CodeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CodeRequest we want to update
     *   }
     * })
     */
    upsert<T extends CodeRequestUpsertArgs>(args: SelectSubset<T, CodeRequestUpsertArgs<ExtArgs>>): Prisma__CodeRequestClient<$Result.GetResult<Prisma.$CodeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CodeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestCountArgs} args - Arguments to filter CodeRequests to count.
     * @example
     * // Count the number of CodeRequests
     * const count = await prisma.codeRequest.count({
     *   where: {
     *     // ... the filter for the CodeRequests we want to count
     *   }
     * })
    **/
    count<T extends CodeRequestCountArgs>(
      args?: Subset<T, CodeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CodeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CodeRequestAggregateArgs>(args: Subset<T, CodeRequestAggregateArgs>): Prisma.PrismaPromise<GetCodeRequestAggregateType<T>>

    /**
     * Group by CodeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CodeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodeRequestGroupByArgs['orderBy'] }
        : { orderBy?: CodeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CodeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CodeRequest model
   */
  readonly fields: CodeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CodeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CodeRequest model
   */
  interface CodeRequestFieldRefs {
    readonly id: FieldRef<"CodeRequest", 'String'>
    readonly projectId: FieldRef<"CodeRequest", 'String'>
    readonly requesterId: FieldRef<"CodeRequest", 'String'>
    readonly requesterEmail: FieldRef<"CodeRequest", 'String'>
    readonly message: FieldRef<"CodeRequest", 'String'>
    readonly status: FieldRef<"CodeRequest", 'String'>
    readonly createdAt: FieldRef<"CodeRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"CodeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CodeRequest findUnique
   */
  export type CodeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * Filter, which CodeRequest to fetch.
     */
    where: CodeRequestWhereUniqueInput
  }

  /**
   * CodeRequest findUniqueOrThrow
   */
  export type CodeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * Filter, which CodeRequest to fetch.
     */
    where: CodeRequestWhereUniqueInput
  }

  /**
   * CodeRequest findFirst
   */
  export type CodeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * Filter, which CodeRequest to fetch.
     */
    where?: CodeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeRequests to fetch.
     */
    orderBy?: CodeRequestOrderByWithRelationInput | CodeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodeRequests.
     */
    cursor?: CodeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodeRequests.
     */
    distinct?: CodeRequestScalarFieldEnum | CodeRequestScalarFieldEnum[]
  }

  /**
   * CodeRequest findFirstOrThrow
   */
  export type CodeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * Filter, which CodeRequest to fetch.
     */
    where?: CodeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeRequests to fetch.
     */
    orderBy?: CodeRequestOrderByWithRelationInput | CodeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodeRequests.
     */
    cursor?: CodeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodeRequests.
     */
    distinct?: CodeRequestScalarFieldEnum | CodeRequestScalarFieldEnum[]
  }

  /**
   * CodeRequest findMany
   */
  export type CodeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * Filter, which CodeRequests to fetch.
     */
    where?: CodeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeRequests to fetch.
     */
    orderBy?: CodeRequestOrderByWithRelationInput | CodeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CodeRequests.
     */
    cursor?: CodeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeRequests.
     */
    skip?: number
    distinct?: CodeRequestScalarFieldEnum | CodeRequestScalarFieldEnum[]
  }

  /**
   * CodeRequest create
   */
  export type CodeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a CodeRequest.
     */
    data: XOR<CodeRequestCreateInput, CodeRequestUncheckedCreateInput>
  }

  /**
   * CodeRequest createMany
   */
  export type CodeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CodeRequests.
     */
    data: CodeRequestCreateManyInput | CodeRequestCreateManyInput[]
  }

  /**
   * CodeRequest createManyAndReturn
   */
  export type CodeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many CodeRequests.
     */
    data: CodeRequestCreateManyInput | CodeRequestCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodeRequest update
   */
  export type CodeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a CodeRequest.
     */
    data: XOR<CodeRequestUpdateInput, CodeRequestUncheckedUpdateInput>
    /**
     * Choose, which CodeRequest to update.
     */
    where: CodeRequestWhereUniqueInput
  }

  /**
   * CodeRequest updateMany
   */
  export type CodeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CodeRequests.
     */
    data: XOR<CodeRequestUpdateManyMutationInput, CodeRequestUncheckedUpdateManyInput>
    /**
     * Filter which CodeRequests to update
     */
    where?: CodeRequestWhereInput
    /**
     * Limit how many CodeRequests to update.
     */
    limit?: number
  }

  /**
   * CodeRequest updateManyAndReturn
   */
  export type CodeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * The data used to update CodeRequests.
     */
    data: XOR<CodeRequestUpdateManyMutationInput, CodeRequestUncheckedUpdateManyInput>
    /**
     * Filter which CodeRequests to update
     */
    where?: CodeRequestWhereInput
    /**
     * Limit how many CodeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodeRequest upsert
   */
  export type CodeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the CodeRequest to update in case it exists.
     */
    where: CodeRequestWhereUniqueInput
    /**
     * In case the CodeRequest found by the `where` argument doesn't exist, create a new CodeRequest with this data.
     */
    create: XOR<CodeRequestCreateInput, CodeRequestUncheckedCreateInput>
    /**
     * In case the CodeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodeRequestUpdateInput, CodeRequestUncheckedUpdateInput>
  }

  /**
   * CodeRequest delete
   */
  export type CodeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
    /**
     * Filter which CodeRequest to delete.
     */
    where: CodeRequestWhereUniqueInput
  }

  /**
   * CodeRequest deleteMany
   */
  export type CodeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodeRequests to delete
     */
    where?: CodeRequestWhereInput
    /**
     * Limit how many CodeRequests to delete.
     */
    limit?: number
  }

  /**
   * CodeRequest without action
   */
  export type CodeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeRequest
     */
    select?: CodeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeRequest
     */
    omit?: CodeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeRequestInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    actorId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    diff: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    actorId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    diff: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actorId: number
    action: number
    entity: number
    entityId: number
    diff: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    actorId?: true
    action?: true
    entity?: true
    entityId?: true
    diff?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actorId?: true
    action?: true
    entity?: true
    entityId?: true
    diff?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actorId?: true
    action?: true
    entity?: true
    entityId?: true
    diff?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    actorId: string | null
    action: string
    entity: string
    entityId: string
    diff: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    createdAt?: boolean
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    createdAt?: boolean
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    createdAt?: boolean
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    actorId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    diff?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "actorId" | "action" | "entity" | "entityId" | "diff" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | AuditLog$actorArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      actor: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorId: string | null
      action: string
      entity: string
      entityId: string
      diff: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actor<T extends AuditLog$actorArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$actorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly diff: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.actor
   */
  export type AuditLog$actorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    aiRegisterId: 'aiRegisterId',
    nameEN: 'nameEN',
    nameFR: 'nameFR',
    serviceInventoryId: 'serviceInventoryId',
    organizationId: 'organizationId',
    descriptionEN: 'descriptionEN',
    descriptionFR: 'descriptionFR',
    primaryUsers: 'primaryUsers',
    developedBy: 'developedBy',
    vendorName: 'vendorName',
    status: 'status',
    statusYear: 'statusYear',
    capabilitiesEN: 'capabilitiesEN',
    capabilitiesFR: 'capabilitiesFR',
    isAutomatedDecisionSystem: 'isAutomatedDecisionSystem',
    openGovAiaId: 'openGovAiaId',
    dataSourcesEN: 'dataSourcesEN',
    dataSourcesFR: 'dataSourcesFR',
    involvesPersonalInfo: 'involvesPersonalInfo',
    personalInformationBanksEN: 'personalInformationBanksEN',
    personalInformationBanksFR: 'personalInformationBanksFR',
    hasUserNotification: 'hasUserNotification',
    atipRequestRefsEN: 'atipRequestRefsEN',
    atipRequestRefsFR: 'atipRequestRefsFR',
    outcomesEN: 'outcomesEN',
    outcomesFR: 'outcomesFR',
    source1: 'source1',
    source2: 'source2',
    moderationState: 'moderationState',
    featured: 'featured',
    isOpenSource: 'isOpenSource',
    githubUrl: 'githubUrl',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectContactScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    email: 'email',
    role: 'role',
    title: 'title',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectContactScalarFieldEnum = (typeof ProjectContactScalarFieldEnum)[keyof typeof ProjectContactScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    nameEN: 'nameEN',
    nameFR: 'nameFR',
    acronym: 'acronym',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    displayName: 'displayName',
    roles: 'roles',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CodeRequestScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    requesterId: 'requesterId',
    requesterEmail: 'requesterEmail',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CodeRequestScalarFieldEnum = (typeof CodeRequestScalarFieldEnum)[keyof typeof CodeRequestScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actorId: 'actorId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    diff: 'diff',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'PrimaryUsers'
   */
  export type EnumPrimaryUsersFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrimaryUsers'>
    


  /**
   * Reference to a field of type 'DevelopedBy'
   */
  export type EnumDevelopedByFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevelopedBy'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ModerationState'
   */
  export type EnumModerationStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationState'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'ContactRole'
   */
  export type EnumContactRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactRole'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    aiRegisterId?: StringNullableFilter<"Project"> | string | null
    nameEN?: StringFilter<"Project"> | string
    nameFR?: StringFilter<"Project"> | string
    serviceInventoryId?: StringNullableFilter<"Project"> | string | null
    organizationId?: StringFilter<"Project"> | string
    descriptionEN?: StringFilter<"Project"> | string
    descriptionFR?: StringFilter<"Project"> | string
    primaryUsers?: EnumPrimaryUsersFilter<"Project"> | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFilter<"Project"> | $Enums.DevelopedBy
    vendorName?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    statusYear?: IntNullableFilter<"Project"> | number | null
    capabilitiesEN?: StringNullableFilter<"Project"> | string | null
    capabilitiesFR?: StringNullableFilter<"Project"> | string | null
    isAutomatedDecisionSystem?: BoolFilter<"Project"> | boolean
    openGovAiaId?: StringNullableFilter<"Project"> | string | null
    dataSourcesEN?: StringNullableFilter<"Project"> | string | null
    dataSourcesFR?: StringNullableFilter<"Project"> | string | null
    involvesPersonalInfo?: BoolFilter<"Project"> | boolean
    personalInformationBanksEN?: StringNullableFilter<"Project"> | string | null
    personalInformationBanksFR?: StringNullableFilter<"Project"> | string | null
    hasUserNotification?: BoolFilter<"Project"> | boolean
    atipRequestRefsEN?: StringNullableFilter<"Project"> | string | null
    atipRequestRefsFR?: StringNullableFilter<"Project"> | string | null
    outcomesEN?: StringNullableFilter<"Project"> | string | null
    outcomesFR?: StringNullableFilter<"Project"> | string | null
    source1?: StringNullableFilter<"Project"> | string | null
    source2?: StringNullableFilter<"Project"> | string | null
    moderationState?: EnumModerationStateFilter<"Project"> | $Enums.ModerationState
    featured?: BoolFilter<"Project"> | boolean
    isOpenSource?: BoolFilter<"Project"> | boolean
    githubUrl?: StringNullableFilter<"Project"> | string | null
    createdBy?: StringNullableFilter<"Project"> | string | null
    updatedBy?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    codeRequests?: CodeRequestListRelationFilter
    contacts?: ProjectContactListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    aiRegisterId?: SortOrderInput | SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    serviceInventoryId?: SortOrderInput | SortOrder
    organizationId?: SortOrder
    descriptionEN?: SortOrder
    descriptionFR?: SortOrder
    primaryUsers?: SortOrder
    developedBy?: SortOrder
    vendorName?: SortOrderInput | SortOrder
    status?: SortOrder
    statusYear?: SortOrderInput | SortOrder
    capabilitiesEN?: SortOrderInput | SortOrder
    capabilitiesFR?: SortOrderInput | SortOrder
    isAutomatedDecisionSystem?: SortOrder
    openGovAiaId?: SortOrderInput | SortOrder
    dataSourcesEN?: SortOrderInput | SortOrder
    dataSourcesFR?: SortOrderInput | SortOrder
    involvesPersonalInfo?: SortOrder
    personalInformationBanksEN?: SortOrderInput | SortOrder
    personalInformationBanksFR?: SortOrderInput | SortOrder
    hasUserNotification?: SortOrder
    atipRequestRefsEN?: SortOrderInput | SortOrder
    atipRequestRefsFR?: SortOrderInput | SortOrder
    outcomesEN?: SortOrderInput | SortOrder
    outcomesFR?: SortOrderInput | SortOrder
    source1?: SortOrderInput | SortOrder
    source2?: SortOrderInput | SortOrder
    moderationState?: SortOrder
    featured?: SortOrder
    isOpenSource?: SortOrder
    githubUrl?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    codeRequests?: CodeRequestOrderByRelationAggregateInput
    contacts?: ProjectContactOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    aiRegisterId?: string
    nameEN_organizationId?: ProjectNameENOrganizationIdCompoundUniqueInput
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    nameEN?: StringFilter<"Project"> | string
    nameFR?: StringFilter<"Project"> | string
    serviceInventoryId?: StringNullableFilter<"Project"> | string | null
    organizationId?: StringFilter<"Project"> | string
    descriptionEN?: StringFilter<"Project"> | string
    descriptionFR?: StringFilter<"Project"> | string
    primaryUsers?: EnumPrimaryUsersFilter<"Project"> | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFilter<"Project"> | $Enums.DevelopedBy
    vendorName?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    statusYear?: IntNullableFilter<"Project"> | number | null
    capabilitiesEN?: StringNullableFilter<"Project"> | string | null
    capabilitiesFR?: StringNullableFilter<"Project"> | string | null
    isAutomatedDecisionSystem?: BoolFilter<"Project"> | boolean
    openGovAiaId?: StringNullableFilter<"Project"> | string | null
    dataSourcesEN?: StringNullableFilter<"Project"> | string | null
    dataSourcesFR?: StringNullableFilter<"Project"> | string | null
    involvesPersonalInfo?: BoolFilter<"Project"> | boolean
    personalInformationBanksEN?: StringNullableFilter<"Project"> | string | null
    personalInformationBanksFR?: StringNullableFilter<"Project"> | string | null
    hasUserNotification?: BoolFilter<"Project"> | boolean
    atipRequestRefsEN?: StringNullableFilter<"Project"> | string | null
    atipRequestRefsFR?: StringNullableFilter<"Project"> | string | null
    outcomesEN?: StringNullableFilter<"Project"> | string | null
    outcomesFR?: StringNullableFilter<"Project"> | string | null
    source1?: StringNullableFilter<"Project"> | string | null
    source2?: StringNullableFilter<"Project"> | string | null
    moderationState?: EnumModerationStateFilter<"Project"> | $Enums.ModerationState
    featured?: BoolFilter<"Project"> | boolean
    isOpenSource?: BoolFilter<"Project"> | boolean
    githubUrl?: StringNullableFilter<"Project"> | string | null
    createdBy?: StringNullableFilter<"Project"> | string | null
    updatedBy?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    codeRequests?: CodeRequestListRelationFilter
    contacts?: ProjectContactListRelationFilter
  }, "id" | "aiRegisterId" | "nameEN_organizationId">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    aiRegisterId?: SortOrderInput | SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    serviceInventoryId?: SortOrderInput | SortOrder
    organizationId?: SortOrder
    descriptionEN?: SortOrder
    descriptionFR?: SortOrder
    primaryUsers?: SortOrder
    developedBy?: SortOrder
    vendorName?: SortOrderInput | SortOrder
    status?: SortOrder
    statusYear?: SortOrderInput | SortOrder
    capabilitiesEN?: SortOrderInput | SortOrder
    capabilitiesFR?: SortOrderInput | SortOrder
    isAutomatedDecisionSystem?: SortOrder
    openGovAiaId?: SortOrderInput | SortOrder
    dataSourcesEN?: SortOrderInput | SortOrder
    dataSourcesFR?: SortOrderInput | SortOrder
    involvesPersonalInfo?: SortOrder
    personalInformationBanksEN?: SortOrderInput | SortOrder
    personalInformationBanksFR?: SortOrderInput | SortOrder
    hasUserNotification?: SortOrder
    atipRequestRefsEN?: SortOrderInput | SortOrder
    atipRequestRefsFR?: SortOrderInput | SortOrder
    outcomesEN?: SortOrderInput | SortOrder
    outcomesFR?: SortOrderInput | SortOrder
    source1?: SortOrderInput | SortOrder
    source2?: SortOrderInput | SortOrder
    moderationState?: SortOrder
    featured?: SortOrder
    isOpenSource?: SortOrder
    githubUrl?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    aiRegisterId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    nameEN?: StringWithAggregatesFilter<"Project"> | string
    nameFR?: StringWithAggregatesFilter<"Project"> | string
    serviceInventoryId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    organizationId?: StringWithAggregatesFilter<"Project"> | string
    descriptionEN?: StringWithAggregatesFilter<"Project"> | string
    descriptionFR?: StringWithAggregatesFilter<"Project"> | string
    primaryUsers?: EnumPrimaryUsersWithAggregatesFilter<"Project"> | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByWithAggregatesFilter<"Project"> | $Enums.DevelopedBy
    vendorName?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    statusYear?: IntNullableWithAggregatesFilter<"Project"> | number | null
    capabilitiesEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    capabilitiesFR?: StringNullableWithAggregatesFilter<"Project"> | string | null
    isAutomatedDecisionSystem?: BoolWithAggregatesFilter<"Project"> | boolean
    openGovAiaId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    dataSourcesEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    dataSourcesFR?: StringNullableWithAggregatesFilter<"Project"> | string | null
    involvesPersonalInfo?: BoolWithAggregatesFilter<"Project"> | boolean
    personalInformationBanksEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    personalInformationBanksFR?: StringNullableWithAggregatesFilter<"Project"> | string | null
    hasUserNotification?: BoolWithAggregatesFilter<"Project"> | boolean
    atipRequestRefsEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    atipRequestRefsFR?: StringNullableWithAggregatesFilter<"Project"> | string | null
    outcomesEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    outcomesFR?: StringNullableWithAggregatesFilter<"Project"> | string | null
    source1?: StringNullableWithAggregatesFilter<"Project"> | string | null
    source2?: StringNullableWithAggregatesFilter<"Project"> | string | null
    moderationState?: EnumModerationStateWithAggregatesFilter<"Project"> | $Enums.ModerationState
    featured?: BoolWithAggregatesFilter<"Project"> | boolean
    isOpenSource?: BoolWithAggregatesFilter<"Project"> | boolean
    githubUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Project"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectContactWhereInput = {
    AND?: ProjectContactWhereInput | ProjectContactWhereInput[]
    OR?: ProjectContactWhereInput[]
    NOT?: ProjectContactWhereInput | ProjectContactWhereInput[]
    id?: StringFilter<"ProjectContact"> | string
    projectId?: StringFilter<"ProjectContact"> | string
    name?: StringFilter<"ProjectContact"> | string
    email?: StringFilter<"ProjectContact"> | string
    role?: EnumContactRoleFilter<"ProjectContact"> | $Enums.ContactRole
    title?: StringNullableFilter<"ProjectContact"> | string | null
    phone?: StringNullableFilter<"ProjectContact"> | string | null
    createdAt?: DateTimeFilter<"ProjectContact"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectContact"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectContactOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    title?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectContactWhereInput | ProjectContactWhereInput[]
    OR?: ProjectContactWhereInput[]
    NOT?: ProjectContactWhereInput | ProjectContactWhereInput[]
    projectId?: StringFilter<"ProjectContact"> | string
    name?: StringFilter<"ProjectContact"> | string
    email?: StringFilter<"ProjectContact"> | string
    role?: EnumContactRoleFilter<"ProjectContact"> | $Enums.ContactRole
    title?: StringNullableFilter<"ProjectContact"> | string | null
    phone?: StringNullableFilter<"ProjectContact"> | string | null
    createdAt?: DateTimeFilter<"ProjectContact"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectContact"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectContactOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    title?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectContactCountOrderByAggregateInput
    _max?: ProjectContactMaxOrderByAggregateInput
    _min?: ProjectContactMinOrderByAggregateInput
  }

  export type ProjectContactScalarWhereWithAggregatesInput = {
    AND?: ProjectContactScalarWhereWithAggregatesInput | ProjectContactScalarWhereWithAggregatesInput[]
    OR?: ProjectContactScalarWhereWithAggregatesInput[]
    NOT?: ProjectContactScalarWhereWithAggregatesInput | ProjectContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectContact"> | string
    projectId?: StringWithAggregatesFilter<"ProjectContact"> | string
    name?: StringWithAggregatesFilter<"ProjectContact"> | string
    email?: StringWithAggregatesFilter<"ProjectContact"> | string
    role?: EnumContactRoleWithAggregatesFilter<"ProjectContact"> | $Enums.ContactRole
    title?: StringNullableWithAggregatesFilter<"ProjectContact"> | string | null
    phone?: StringNullableWithAggregatesFilter<"ProjectContact"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProjectContact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectContact"> | Date | string
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    nameEN?: StringFilter<"Organization"> | string
    nameFR?: StringFilter<"Organization"> | string
    acronym?: StringNullableFilter<"Organization"> | string | null
    url?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    projects?: ProjectListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    acronym?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nameEN?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    nameFR?: StringFilter<"Organization"> | string
    acronym?: StringNullableFilter<"Organization"> | string | null
    url?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    projects?: ProjectListRelationFilter
  }, "id" | "nameEN">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    acronym?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    nameEN?: StringWithAggregatesFilter<"Organization"> | string
    nameFR?: StringWithAggregatesFilter<"Organization"> | string
    acronym?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    url?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    roles?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    displayName?: StringFilter<"User"> | string
    roles?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringWithAggregatesFilter<"User"> | string
    roles?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CodeRequestWhereInput = {
    AND?: CodeRequestWhereInput | CodeRequestWhereInput[]
    OR?: CodeRequestWhereInput[]
    NOT?: CodeRequestWhereInput | CodeRequestWhereInput[]
    id?: StringFilter<"CodeRequest"> | string
    projectId?: StringFilter<"CodeRequest"> | string
    requesterId?: StringNullableFilter<"CodeRequest"> | string | null
    requesterEmail?: StringFilter<"CodeRequest"> | string
    message?: StringFilter<"CodeRequest"> | string
    status?: StringFilter<"CodeRequest"> | string
    createdAt?: DateTimeFilter<"CodeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"CodeRequest"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type CodeRequestOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    requesterId?: SortOrderInput | SortOrder
    requesterEmail?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type CodeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CodeRequestWhereInput | CodeRequestWhereInput[]
    OR?: CodeRequestWhereInput[]
    NOT?: CodeRequestWhereInput | CodeRequestWhereInput[]
    projectId?: StringFilter<"CodeRequest"> | string
    requesterId?: StringNullableFilter<"CodeRequest"> | string | null
    requesterEmail?: StringFilter<"CodeRequest"> | string
    message?: StringFilter<"CodeRequest"> | string
    status?: StringFilter<"CodeRequest"> | string
    createdAt?: DateTimeFilter<"CodeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"CodeRequest"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type CodeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    requesterId?: SortOrderInput | SortOrder
    requesterEmail?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CodeRequestCountOrderByAggregateInput
    _max?: CodeRequestMaxOrderByAggregateInput
    _min?: CodeRequestMinOrderByAggregateInput
  }

  export type CodeRequestScalarWhereWithAggregatesInput = {
    AND?: CodeRequestScalarWhereWithAggregatesInput | CodeRequestScalarWhereWithAggregatesInput[]
    OR?: CodeRequestScalarWhereWithAggregatesInput[]
    NOT?: CodeRequestScalarWhereWithAggregatesInput | CodeRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CodeRequest"> | string
    projectId?: StringWithAggregatesFilter<"CodeRequest"> | string
    requesterId?: StringNullableWithAggregatesFilter<"CodeRequest"> | string | null
    requesterEmail?: StringWithAggregatesFilter<"CodeRequest"> | string
    message?: StringWithAggregatesFilter<"CodeRequest"> | string
    status?: StringWithAggregatesFilter<"CodeRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CodeRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CodeRequest"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    diff?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actorId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    actor?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    diff?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actorId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    actorId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    diff?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutProjectsInput
    codeRequests?: CodeRequestCreateNestedManyWithoutProjectInput
    contacts?: ProjectContactCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    organizationId: string
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    codeRequests?: CodeRequestUncheckedCreateNestedManyWithoutProjectInput
    contacts?: ProjectContactUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutProjectsNestedInput
    codeRequests?: CodeRequestUpdateManyWithoutProjectNestedInput
    contacts?: ProjectContactUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codeRequests?: CodeRequestUncheckedUpdateManyWithoutProjectNestedInput
    contacts?: ProjectContactUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    organizationId: string
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContactCreateInput = {
    id?: string
    name: string
    email: string
    role: $Enums.ContactRole
    title?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutContactsInput
  }

  export type ProjectContactUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    email: string
    role: $Enums.ContactRole
    title?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ProjectContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContactCreateManyInput = {
    id?: string
    projectId: string
    name: string
    email: string
    role: $Enums.ContactRole
    title?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    nameEN: string
    nameFR: string
    acronym?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    nameEN: string
    nameFR: string
    acronym?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    acronym?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    acronym?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    nameEN: string
    nameFR: string
    acronym?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    acronym?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    acronym?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    displayName: string
    roles: string
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    displayName: string
    roles: string
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    displayName: string
    roles: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestCreateInput = {
    id?: string
    requesterId?: string | null
    requesterEmail: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutCodeRequestsInput
  }

  export type CodeRequestUncheckedCreateInput = {
    id?: string
    projectId: string
    requesterId?: string | null
    requesterEmail: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutCodeRequestsNestedInput
  }

  export type CodeRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestCreateManyInput = {
    id?: string
    projectId: string
    requesterId?: string | null
    requesterEmail: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    diff?: string | null
    createdAt?: Date | string
    actor?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    actorId?: string | null
    action: string
    entity: string
    entityId: string
    diff?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    actorId?: string | null
    action: string
    entity: string
    entityId: string
    diff?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPrimaryUsersFilter<$PrismaModel = never> = {
    equals?: $Enums.PrimaryUsers | EnumPrimaryUsersFieldRefInput<$PrismaModel>
    in?: $Enums.PrimaryUsers[]
    notIn?: $Enums.PrimaryUsers[]
    not?: NestedEnumPrimaryUsersFilter<$PrismaModel> | $Enums.PrimaryUsers
  }

  export type EnumDevelopedByFilter<$PrismaModel = never> = {
    equals?: $Enums.DevelopedBy | EnumDevelopedByFieldRefInput<$PrismaModel>
    in?: $Enums.DevelopedBy[]
    notIn?: $Enums.DevelopedBy[]
    not?: NestedEnumDevelopedByFilter<$PrismaModel> | $Enums.DevelopedBy
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[]
    notIn?: $Enums.ProjectStatus[]
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumModerationStateFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationState | EnumModerationStateFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationState[]
    notIn?: $Enums.ModerationState[]
    not?: NestedEnumModerationStateFilter<$PrismaModel> | $Enums.ModerationState
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type CodeRequestListRelationFilter = {
    every?: CodeRequestWhereInput
    some?: CodeRequestWhereInput
    none?: CodeRequestWhereInput
  }

  export type ProjectContactListRelationFilter = {
    every?: ProjectContactWhereInput
    some?: ProjectContactWhereInput
    none?: ProjectContactWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CodeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectNameENOrganizationIdCompoundUniqueInput = {
    nameEN: string
    organizationId: string
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    aiRegisterId?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    serviceInventoryId?: SortOrder
    organizationId?: SortOrder
    descriptionEN?: SortOrder
    descriptionFR?: SortOrder
    primaryUsers?: SortOrder
    developedBy?: SortOrder
    vendorName?: SortOrder
    status?: SortOrder
    statusYear?: SortOrder
    capabilitiesEN?: SortOrder
    capabilitiesFR?: SortOrder
    isAutomatedDecisionSystem?: SortOrder
    openGovAiaId?: SortOrder
    dataSourcesEN?: SortOrder
    dataSourcesFR?: SortOrder
    involvesPersonalInfo?: SortOrder
    personalInformationBanksEN?: SortOrder
    personalInformationBanksFR?: SortOrder
    hasUserNotification?: SortOrder
    atipRequestRefsEN?: SortOrder
    atipRequestRefsFR?: SortOrder
    outcomesEN?: SortOrder
    outcomesFR?: SortOrder
    source1?: SortOrder
    source2?: SortOrder
    moderationState?: SortOrder
    featured?: SortOrder
    isOpenSource?: SortOrder
    githubUrl?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    statusYear?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    aiRegisterId?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    serviceInventoryId?: SortOrder
    organizationId?: SortOrder
    descriptionEN?: SortOrder
    descriptionFR?: SortOrder
    primaryUsers?: SortOrder
    developedBy?: SortOrder
    vendorName?: SortOrder
    status?: SortOrder
    statusYear?: SortOrder
    capabilitiesEN?: SortOrder
    capabilitiesFR?: SortOrder
    isAutomatedDecisionSystem?: SortOrder
    openGovAiaId?: SortOrder
    dataSourcesEN?: SortOrder
    dataSourcesFR?: SortOrder
    involvesPersonalInfo?: SortOrder
    personalInformationBanksEN?: SortOrder
    personalInformationBanksFR?: SortOrder
    hasUserNotification?: SortOrder
    atipRequestRefsEN?: SortOrder
    atipRequestRefsFR?: SortOrder
    outcomesEN?: SortOrder
    outcomesFR?: SortOrder
    source1?: SortOrder
    source2?: SortOrder
    moderationState?: SortOrder
    featured?: SortOrder
    isOpenSource?: SortOrder
    githubUrl?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    aiRegisterId?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    serviceInventoryId?: SortOrder
    organizationId?: SortOrder
    descriptionEN?: SortOrder
    descriptionFR?: SortOrder
    primaryUsers?: SortOrder
    developedBy?: SortOrder
    vendorName?: SortOrder
    status?: SortOrder
    statusYear?: SortOrder
    capabilitiesEN?: SortOrder
    capabilitiesFR?: SortOrder
    isAutomatedDecisionSystem?: SortOrder
    openGovAiaId?: SortOrder
    dataSourcesEN?: SortOrder
    dataSourcesFR?: SortOrder
    involvesPersonalInfo?: SortOrder
    personalInformationBanksEN?: SortOrder
    personalInformationBanksFR?: SortOrder
    hasUserNotification?: SortOrder
    atipRequestRefsEN?: SortOrder
    atipRequestRefsFR?: SortOrder
    outcomesEN?: SortOrder
    outcomesFR?: SortOrder
    source1?: SortOrder
    source2?: SortOrder
    moderationState?: SortOrder
    featured?: SortOrder
    isOpenSource?: SortOrder
    githubUrl?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    statusYear?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPrimaryUsersWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrimaryUsers | EnumPrimaryUsersFieldRefInput<$PrismaModel>
    in?: $Enums.PrimaryUsers[]
    notIn?: $Enums.PrimaryUsers[]
    not?: NestedEnumPrimaryUsersWithAggregatesFilter<$PrismaModel> | $Enums.PrimaryUsers
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrimaryUsersFilter<$PrismaModel>
    _max?: NestedEnumPrimaryUsersFilter<$PrismaModel>
  }

  export type EnumDevelopedByWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevelopedBy | EnumDevelopedByFieldRefInput<$PrismaModel>
    in?: $Enums.DevelopedBy[]
    notIn?: $Enums.DevelopedBy[]
    not?: NestedEnumDevelopedByWithAggregatesFilter<$PrismaModel> | $Enums.DevelopedBy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevelopedByFilter<$PrismaModel>
    _max?: NestedEnumDevelopedByFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[]
    notIn?: $Enums.ProjectStatus[]
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumModerationStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationState | EnumModerationStateFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationState[]
    notIn?: $Enums.ModerationState[]
    not?: NestedEnumModerationStateWithAggregatesFilter<$PrismaModel> | $Enums.ModerationState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModerationStateFilter<$PrismaModel>
    _max?: NestedEnumModerationStateFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumContactRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactRole | EnumContactRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ContactRole[]
    notIn?: $Enums.ContactRole[]
    not?: NestedEnumContactRoleFilter<$PrismaModel> | $Enums.ContactRole
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectContactCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    title?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectContactMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    title?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectContactMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    title?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumContactRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactRole | EnumContactRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ContactRole[]
    notIn?: $Enums.ContactRole[]
    not?: NestedEnumContactRoleWithAggregatesFilter<$PrismaModel> | $Enums.ContactRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContactRoleFilter<$PrismaModel>
    _max?: NestedEnumContactRoleFilter<$PrismaModel>
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    acronym?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    acronym?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    nameEN?: SortOrder
    nameFR?: SortOrder
    acronym?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    roles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CodeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    requesterId?: SortOrder
    requesterEmail?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CodeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    requesterId?: SortOrder
    requesterEmail?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CodeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    requesterId?: SortOrder
    requesterEmail?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    diff?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationCreateNestedOneWithoutProjectsInput = {
    create?: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutProjectsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CodeRequestCreateNestedManyWithoutProjectInput = {
    create?: XOR<CodeRequestCreateWithoutProjectInput, CodeRequestUncheckedCreateWithoutProjectInput> | CodeRequestCreateWithoutProjectInput[] | CodeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CodeRequestCreateOrConnectWithoutProjectInput | CodeRequestCreateOrConnectWithoutProjectInput[]
    createMany?: CodeRequestCreateManyProjectInputEnvelope
    connect?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
  }

  export type ProjectContactCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectContactCreateWithoutProjectInput, ProjectContactUncheckedCreateWithoutProjectInput> | ProjectContactCreateWithoutProjectInput[] | ProjectContactUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectContactCreateOrConnectWithoutProjectInput | ProjectContactCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectContactCreateManyProjectInputEnvelope
    connect?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
  }

  export type CodeRequestUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<CodeRequestCreateWithoutProjectInput, CodeRequestUncheckedCreateWithoutProjectInput> | CodeRequestCreateWithoutProjectInput[] | CodeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CodeRequestCreateOrConnectWithoutProjectInput | CodeRequestCreateOrConnectWithoutProjectInput[]
    createMany?: CodeRequestCreateManyProjectInputEnvelope
    connect?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
  }

  export type ProjectContactUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectContactCreateWithoutProjectInput, ProjectContactUncheckedCreateWithoutProjectInput> | ProjectContactCreateWithoutProjectInput[] | ProjectContactUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectContactCreateOrConnectWithoutProjectInput | ProjectContactCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectContactCreateManyProjectInputEnvelope
    connect?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPrimaryUsersFieldUpdateOperationsInput = {
    set?: $Enums.PrimaryUsers
  }

  export type EnumDevelopedByFieldUpdateOperationsInput = {
    set?: $Enums.DevelopedBy
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumModerationStateFieldUpdateOperationsInput = {
    set?: $Enums.ModerationState
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrganizationUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutProjectsInput
    upsert?: OrganizationUpsertWithoutProjectsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutProjectsInput, OrganizationUpdateWithoutProjectsInput>, OrganizationUncheckedUpdateWithoutProjectsInput>
  }

  export type CodeRequestUpdateManyWithoutProjectNestedInput = {
    create?: XOR<CodeRequestCreateWithoutProjectInput, CodeRequestUncheckedCreateWithoutProjectInput> | CodeRequestCreateWithoutProjectInput[] | CodeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CodeRequestCreateOrConnectWithoutProjectInput | CodeRequestCreateOrConnectWithoutProjectInput[]
    upsert?: CodeRequestUpsertWithWhereUniqueWithoutProjectInput | CodeRequestUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: CodeRequestCreateManyProjectInputEnvelope
    set?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    disconnect?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    delete?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    connect?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    update?: CodeRequestUpdateWithWhereUniqueWithoutProjectInput | CodeRequestUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: CodeRequestUpdateManyWithWhereWithoutProjectInput | CodeRequestUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: CodeRequestScalarWhereInput | CodeRequestScalarWhereInput[]
  }

  export type ProjectContactUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectContactCreateWithoutProjectInput, ProjectContactUncheckedCreateWithoutProjectInput> | ProjectContactCreateWithoutProjectInput[] | ProjectContactUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectContactCreateOrConnectWithoutProjectInput | ProjectContactCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectContactUpsertWithWhereUniqueWithoutProjectInput | ProjectContactUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectContactCreateManyProjectInputEnvelope
    set?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    disconnect?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    delete?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    connect?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    update?: ProjectContactUpdateWithWhereUniqueWithoutProjectInput | ProjectContactUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectContactUpdateManyWithWhereWithoutProjectInput | ProjectContactUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectContactScalarWhereInput | ProjectContactScalarWhereInput[]
  }

  export type CodeRequestUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<CodeRequestCreateWithoutProjectInput, CodeRequestUncheckedCreateWithoutProjectInput> | CodeRequestCreateWithoutProjectInput[] | CodeRequestUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CodeRequestCreateOrConnectWithoutProjectInput | CodeRequestCreateOrConnectWithoutProjectInput[]
    upsert?: CodeRequestUpsertWithWhereUniqueWithoutProjectInput | CodeRequestUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: CodeRequestCreateManyProjectInputEnvelope
    set?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    disconnect?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    delete?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    connect?: CodeRequestWhereUniqueInput | CodeRequestWhereUniqueInput[]
    update?: CodeRequestUpdateWithWhereUniqueWithoutProjectInput | CodeRequestUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: CodeRequestUpdateManyWithWhereWithoutProjectInput | CodeRequestUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: CodeRequestScalarWhereInput | CodeRequestScalarWhereInput[]
  }

  export type ProjectContactUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectContactCreateWithoutProjectInput, ProjectContactUncheckedCreateWithoutProjectInput> | ProjectContactCreateWithoutProjectInput[] | ProjectContactUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectContactCreateOrConnectWithoutProjectInput | ProjectContactCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectContactUpsertWithWhereUniqueWithoutProjectInput | ProjectContactUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectContactCreateManyProjectInputEnvelope
    set?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    disconnect?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    delete?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    connect?: ProjectContactWhereUniqueInput | ProjectContactWhereUniqueInput[]
    update?: ProjectContactUpdateWithWhereUniqueWithoutProjectInput | ProjectContactUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectContactUpdateManyWithWhereWithoutProjectInput | ProjectContactUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectContactScalarWhereInput | ProjectContactScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutContactsInput = {
    create?: XOR<ProjectCreateWithoutContactsInput, ProjectUncheckedCreateWithoutContactsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutContactsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumContactRoleFieldUpdateOperationsInput = {
    set?: $Enums.ContactRole
  }

  export type ProjectUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<ProjectCreateWithoutContactsInput, ProjectUncheckedCreateWithoutContactsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutContactsInput
    upsert?: ProjectUpsertWithoutContactsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutContactsInput, ProjectUpdateWithoutContactsInput>, ProjectUncheckedUpdateWithoutContactsInput>
  }

  export type ProjectCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOrganizationInput | ProjectUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOrganizationInput | ProjectUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOrganizationInput | ProjectUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOrganizationInput | ProjectUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOrganizationInput | ProjectUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOrganizationInput | ProjectUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type AuditLogCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutCodeRequestsInput = {
    create?: XOR<ProjectCreateWithoutCodeRequestsInput, ProjectUncheckedCreateWithoutCodeRequestsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCodeRequestsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutCodeRequestsNestedInput = {
    create?: XOR<ProjectCreateWithoutCodeRequestsInput, ProjectUncheckedCreateWithoutCodeRequestsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCodeRequestsInput
    upsert?: ProjectUpsertWithoutCodeRequestsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutCodeRequestsInput, ProjectUpdateWithoutCodeRequestsInput>, ProjectUncheckedUpdateWithoutCodeRequestsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPrimaryUsersFilter<$PrismaModel = never> = {
    equals?: $Enums.PrimaryUsers | EnumPrimaryUsersFieldRefInput<$PrismaModel>
    in?: $Enums.PrimaryUsers[]
    notIn?: $Enums.PrimaryUsers[]
    not?: NestedEnumPrimaryUsersFilter<$PrismaModel> | $Enums.PrimaryUsers
  }

  export type NestedEnumDevelopedByFilter<$PrismaModel = never> = {
    equals?: $Enums.DevelopedBy | EnumDevelopedByFieldRefInput<$PrismaModel>
    in?: $Enums.DevelopedBy[]
    notIn?: $Enums.DevelopedBy[]
    not?: NestedEnumDevelopedByFilter<$PrismaModel> | $Enums.DevelopedBy
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[]
    notIn?: $Enums.ProjectStatus[]
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumModerationStateFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationState | EnumModerationStateFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationState[]
    notIn?: $Enums.ModerationState[]
    not?: NestedEnumModerationStateFilter<$PrismaModel> | $Enums.ModerationState
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPrimaryUsersWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrimaryUsers | EnumPrimaryUsersFieldRefInput<$PrismaModel>
    in?: $Enums.PrimaryUsers[]
    notIn?: $Enums.PrimaryUsers[]
    not?: NestedEnumPrimaryUsersWithAggregatesFilter<$PrismaModel> | $Enums.PrimaryUsers
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrimaryUsersFilter<$PrismaModel>
    _max?: NestedEnumPrimaryUsersFilter<$PrismaModel>
  }

  export type NestedEnumDevelopedByWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevelopedBy | EnumDevelopedByFieldRefInput<$PrismaModel>
    in?: $Enums.DevelopedBy[]
    notIn?: $Enums.DevelopedBy[]
    not?: NestedEnumDevelopedByWithAggregatesFilter<$PrismaModel> | $Enums.DevelopedBy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevelopedByFilter<$PrismaModel>
    _max?: NestedEnumDevelopedByFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[]
    notIn?: $Enums.ProjectStatus[]
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumModerationStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationState | EnumModerationStateFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationState[]
    notIn?: $Enums.ModerationState[]
    not?: NestedEnumModerationStateWithAggregatesFilter<$PrismaModel> | $Enums.ModerationState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModerationStateFilter<$PrismaModel>
    _max?: NestedEnumModerationStateFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumContactRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactRole | EnumContactRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ContactRole[]
    notIn?: $Enums.ContactRole[]
    not?: NestedEnumContactRoleFilter<$PrismaModel> | $Enums.ContactRole
  }

  export type NestedEnumContactRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactRole | EnumContactRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ContactRole[]
    notIn?: $Enums.ContactRole[]
    not?: NestedEnumContactRoleWithAggregatesFilter<$PrismaModel> | $Enums.ContactRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContactRoleFilter<$PrismaModel>
    _max?: NestedEnumContactRoleFilter<$PrismaModel>
  }

  export type OrganizationCreateWithoutProjectsInput = {
    id?: string
    nameEN: string
    nameFR: string
    acronym?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUncheckedCreateWithoutProjectsInput = {
    id?: string
    nameEN: string
    nameFR: string
    acronym?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationCreateOrConnectWithoutProjectsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
  }

  export type CodeRequestCreateWithoutProjectInput = {
    id?: string
    requesterId?: string | null
    requesterEmail: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeRequestUncheckedCreateWithoutProjectInput = {
    id?: string
    requesterId?: string | null
    requesterEmail: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeRequestCreateOrConnectWithoutProjectInput = {
    where: CodeRequestWhereUniqueInput
    create: XOR<CodeRequestCreateWithoutProjectInput, CodeRequestUncheckedCreateWithoutProjectInput>
  }

  export type CodeRequestCreateManyProjectInputEnvelope = {
    data: CodeRequestCreateManyProjectInput | CodeRequestCreateManyProjectInput[]
  }

  export type ProjectContactCreateWithoutProjectInput = {
    id?: string
    name: string
    email: string
    role: $Enums.ContactRole
    title?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectContactUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    email: string
    role: $Enums.ContactRole
    title?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectContactCreateOrConnectWithoutProjectInput = {
    where: ProjectContactWhereUniqueInput
    create: XOR<ProjectContactCreateWithoutProjectInput, ProjectContactUncheckedCreateWithoutProjectInput>
  }

  export type ProjectContactCreateManyProjectInputEnvelope = {
    data: ProjectContactCreateManyProjectInput | ProjectContactCreateManyProjectInput[]
  }

  export type OrganizationUpsertWithoutProjectsInput = {
    update: XOR<OrganizationUpdateWithoutProjectsInput, OrganizationUncheckedUpdateWithoutProjectsInput>
    create: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutProjectsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutProjectsInput, OrganizationUncheckedUpdateWithoutProjectsInput>
  }

  export type OrganizationUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    acronym?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    acronym?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestUpsertWithWhereUniqueWithoutProjectInput = {
    where: CodeRequestWhereUniqueInput
    update: XOR<CodeRequestUpdateWithoutProjectInput, CodeRequestUncheckedUpdateWithoutProjectInput>
    create: XOR<CodeRequestCreateWithoutProjectInput, CodeRequestUncheckedCreateWithoutProjectInput>
  }

  export type CodeRequestUpdateWithWhereUniqueWithoutProjectInput = {
    where: CodeRequestWhereUniqueInput
    data: XOR<CodeRequestUpdateWithoutProjectInput, CodeRequestUncheckedUpdateWithoutProjectInput>
  }

  export type CodeRequestUpdateManyWithWhereWithoutProjectInput = {
    where: CodeRequestScalarWhereInput
    data: XOR<CodeRequestUpdateManyMutationInput, CodeRequestUncheckedUpdateManyWithoutProjectInput>
  }

  export type CodeRequestScalarWhereInput = {
    AND?: CodeRequestScalarWhereInput | CodeRequestScalarWhereInput[]
    OR?: CodeRequestScalarWhereInput[]
    NOT?: CodeRequestScalarWhereInput | CodeRequestScalarWhereInput[]
    id?: StringFilter<"CodeRequest"> | string
    projectId?: StringFilter<"CodeRequest"> | string
    requesterId?: StringNullableFilter<"CodeRequest"> | string | null
    requesterEmail?: StringFilter<"CodeRequest"> | string
    message?: StringFilter<"CodeRequest"> | string
    status?: StringFilter<"CodeRequest"> | string
    createdAt?: DateTimeFilter<"CodeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"CodeRequest"> | Date | string
  }

  export type ProjectContactUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectContactWhereUniqueInput
    update: XOR<ProjectContactUpdateWithoutProjectInput, ProjectContactUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectContactCreateWithoutProjectInput, ProjectContactUncheckedCreateWithoutProjectInput>
  }

  export type ProjectContactUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectContactWhereUniqueInput
    data: XOR<ProjectContactUpdateWithoutProjectInput, ProjectContactUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectContactUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectContactScalarWhereInput
    data: XOR<ProjectContactUpdateManyMutationInput, ProjectContactUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectContactScalarWhereInput = {
    AND?: ProjectContactScalarWhereInput | ProjectContactScalarWhereInput[]
    OR?: ProjectContactScalarWhereInput[]
    NOT?: ProjectContactScalarWhereInput | ProjectContactScalarWhereInput[]
    id?: StringFilter<"ProjectContact"> | string
    projectId?: StringFilter<"ProjectContact"> | string
    name?: StringFilter<"ProjectContact"> | string
    email?: StringFilter<"ProjectContact"> | string
    role?: EnumContactRoleFilter<"ProjectContact"> | $Enums.ContactRole
    title?: StringNullableFilter<"ProjectContact"> | string | null
    phone?: StringNullableFilter<"ProjectContact"> | string | null
    createdAt?: DateTimeFilter<"ProjectContact"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectContact"> | Date | string
  }

  export type ProjectCreateWithoutContactsInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutProjectsInput
    codeRequests?: CodeRequestCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutContactsInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    organizationId: string
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    codeRequests?: CodeRequestUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutContactsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutContactsInput, ProjectUncheckedCreateWithoutContactsInput>
  }

  export type ProjectUpsertWithoutContactsInput = {
    update: XOR<ProjectUpdateWithoutContactsInput, ProjectUncheckedUpdateWithoutContactsInput>
    create: XOR<ProjectCreateWithoutContactsInput, ProjectUncheckedCreateWithoutContactsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutContactsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutContactsInput, ProjectUncheckedUpdateWithoutContactsInput>
  }

  export type ProjectUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutProjectsNestedInput
    codeRequests?: CodeRequestUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codeRequests?: CodeRequestUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutOrganizationInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    codeRequests?: CodeRequestCreateNestedManyWithoutProjectInput
    contacts?: ProjectContactCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutOrganizationInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    codeRequests?: CodeRequestUncheckedCreateNestedManyWithoutProjectInput
    contacts?: ProjectContactUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutOrganizationInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput>
  }

  export type ProjectCreateManyOrganizationInputEnvelope = {
    data: ProjectCreateManyOrganizationInput | ProjectCreateManyOrganizationInput[]
  }

  export type ProjectUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutOrganizationInput, ProjectUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutOrganizationInput, ProjectUncheckedUpdateWithoutOrganizationInput>
  }

  export type ProjectUpdateManyWithWhereWithoutOrganizationInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    aiRegisterId?: StringNullableFilter<"Project"> | string | null
    nameEN?: StringFilter<"Project"> | string
    nameFR?: StringFilter<"Project"> | string
    serviceInventoryId?: StringNullableFilter<"Project"> | string | null
    organizationId?: StringFilter<"Project"> | string
    descriptionEN?: StringFilter<"Project"> | string
    descriptionFR?: StringFilter<"Project"> | string
    primaryUsers?: EnumPrimaryUsersFilter<"Project"> | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFilter<"Project"> | $Enums.DevelopedBy
    vendorName?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    statusYear?: IntNullableFilter<"Project"> | number | null
    capabilitiesEN?: StringNullableFilter<"Project"> | string | null
    capabilitiesFR?: StringNullableFilter<"Project"> | string | null
    isAutomatedDecisionSystem?: BoolFilter<"Project"> | boolean
    openGovAiaId?: StringNullableFilter<"Project"> | string | null
    dataSourcesEN?: StringNullableFilter<"Project"> | string | null
    dataSourcesFR?: StringNullableFilter<"Project"> | string | null
    involvesPersonalInfo?: BoolFilter<"Project"> | boolean
    personalInformationBanksEN?: StringNullableFilter<"Project"> | string | null
    personalInformationBanksFR?: StringNullableFilter<"Project"> | string | null
    hasUserNotification?: BoolFilter<"Project"> | boolean
    atipRequestRefsEN?: StringNullableFilter<"Project"> | string | null
    atipRequestRefsFR?: StringNullableFilter<"Project"> | string | null
    outcomesEN?: StringNullableFilter<"Project"> | string | null
    outcomesFR?: StringNullableFilter<"Project"> | string | null
    source1?: StringNullableFilter<"Project"> | string | null
    source2?: StringNullableFilter<"Project"> | string | null
    moderationState?: EnumModerationStateFilter<"Project"> | $Enums.ModerationState
    featured?: BoolFilter<"Project"> | boolean
    isOpenSource?: BoolFilter<"Project"> | boolean
    githubUrl?: StringNullableFilter<"Project"> | string | null
    createdBy?: StringNullableFilter<"Project"> | string | null
    updatedBy?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type AuditLogCreateWithoutActorInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    diff?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutActorInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    diff?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogCreateManyActorInputEnvelope = {
    data: AuditLogCreateManyActorInput | AuditLogCreateManyActorInput[]
  }

  export type AuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutActorInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutActorInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    diff?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ProjectCreateWithoutCodeRequestsInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutProjectsInput
    contacts?: ProjectContactCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCodeRequestsInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    organizationId: string
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ProjectContactUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCodeRequestsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCodeRequestsInput, ProjectUncheckedCreateWithoutCodeRequestsInput>
  }

  export type ProjectUpsertWithoutCodeRequestsInput = {
    update: XOR<ProjectUpdateWithoutCodeRequestsInput, ProjectUncheckedUpdateWithoutCodeRequestsInput>
    create: XOR<ProjectCreateWithoutCodeRequestsInput, ProjectUncheckedCreateWithoutCodeRequestsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutCodeRequestsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutCodeRequestsInput, ProjectUncheckedUpdateWithoutCodeRequestsInput>
  }

  export type ProjectUpdateWithoutCodeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutProjectsNestedInput
    contacts?: ProjectContactUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCodeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: StringFieldUpdateOperationsInput | string
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ProjectContactUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    displayName: string
    roles: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    displayName: string
    roles: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestCreateManyProjectInput = {
    id?: string
    requesterId?: string | null
    requesterEmail: string
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectContactCreateManyProjectInput = {
    id?: string
    name: string
    email: string
    role: $Enums.ContactRole
    title?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeRequestUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeRequestUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterEmail?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContactUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContactUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectContactUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumContactRoleFieldUpdateOperationsInput | $Enums.ContactRole
    title?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyOrganizationInput = {
    id?: string
    aiRegisterId?: string | null
    nameEN: string
    nameFR: string
    serviceInventoryId?: string | null
    descriptionEN: string
    descriptionFR: string
    primaryUsers: $Enums.PrimaryUsers
    developedBy: $Enums.DevelopedBy
    vendorName?: string | null
    status: $Enums.ProjectStatus
    statusYear?: number | null
    capabilitiesEN?: string | null
    capabilitiesFR?: string | null
    isAutomatedDecisionSystem?: boolean
    openGovAiaId?: string | null
    dataSourcesEN?: string | null
    dataSourcesFR?: string | null
    involvesPersonalInfo?: boolean
    personalInformationBanksEN?: string | null
    personalInformationBanksFR?: string | null
    hasUserNotification?: boolean
    atipRequestRefsEN?: string | null
    atipRequestRefsFR?: string | null
    outcomesEN?: string | null
    outcomesFR?: string | null
    source1?: string | null
    source2?: string | null
    moderationState?: $Enums.ModerationState
    featured?: boolean
    isOpenSource?: boolean
    githubUrl?: string | null
    createdBy?: string | null
    updatedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codeRequests?: CodeRequestUpdateManyWithoutProjectNestedInput
    contacts?: ProjectContactUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    codeRequests?: CodeRequestUncheckedUpdateManyWithoutProjectNestedInput
    contacts?: ProjectContactUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aiRegisterId?: NullableStringFieldUpdateOperationsInput | string | null
    nameEN?: StringFieldUpdateOperationsInput | string
    nameFR?: StringFieldUpdateOperationsInput | string
    serviceInventoryId?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: StringFieldUpdateOperationsInput | string
    descriptionFR?: StringFieldUpdateOperationsInput | string
    primaryUsers?: EnumPrimaryUsersFieldUpdateOperationsInput | $Enums.PrimaryUsers
    developedBy?: EnumDevelopedByFieldUpdateOperationsInput | $Enums.DevelopedBy
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    statusYear?: NullableIntFieldUpdateOperationsInput | number | null
    capabilitiesEN?: NullableStringFieldUpdateOperationsInput | string | null
    capabilitiesFR?: NullableStringFieldUpdateOperationsInput | string | null
    isAutomatedDecisionSystem?: BoolFieldUpdateOperationsInput | boolean
    openGovAiaId?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesEN?: NullableStringFieldUpdateOperationsInput | string | null
    dataSourcesFR?: NullableStringFieldUpdateOperationsInput | string | null
    involvesPersonalInfo?: BoolFieldUpdateOperationsInput | boolean
    personalInformationBanksEN?: NullableStringFieldUpdateOperationsInput | string | null
    personalInformationBanksFR?: NullableStringFieldUpdateOperationsInput | string | null
    hasUserNotification?: BoolFieldUpdateOperationsInput | boolean
    atipRequestRefsEN?: NullableStringFieldUpdateOperationsInput | string | null
    atipRequestRefsFR?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesEN?: NullableStringFieldUpdateOperationsInput | string | null
    outcomesFR?: NullableStringFieldUpdateOperationsInput | string | null
    source1?: NullableStringFieldUpdateOperationsInput | string | null
    source2?: NullableStringFieldUpdateOperationsInput | string | null
    moderationState?: EnumModerationStateFieldUpdateOperationsInput | $Enums.ModerationState
    featured?: BoolFieldUpdateOperationsInput | boolean
    isOpenSource?: BoolFieldUpdateOperationsInput | boolean
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyActorInput = {
    id?: string
    action: string
    entity: string
    entityId: string
    diff?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    diff?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}