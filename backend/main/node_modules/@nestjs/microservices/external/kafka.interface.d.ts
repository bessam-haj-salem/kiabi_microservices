/**
 * Do NOT add NestJS logic to this interface.  It is meant to ONLY represent the types for the kafkajs package.
 *
 * @see https://github.com/tulios/kafkajs/blob/master/types/index.d.ts
 */
/// <reference types="node" />
import * as net from 'net';
import * as tls from 'tls';
declare type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
declare type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export declare class Kafka {
    constructor(config: KafkaConfig);
    producer(config?: ProducerConfig): Producer;
    consumer(config?: ConsumerConfig): Consumer;
    admin(config?: AdminConfig): Admin;
    logger(): Logger;
}
export declare type BrokersFunction = () => string[] | Promise<string[]>;
export interface KafkaConfig {
    brokers: string[] | BrokersFunction;
    ssl?: tls.ConnectionOptions | boolean;
    sasl?: SASLOptions;
    clientId?: string;
    connectionTimeout?: number;
    authenticationTimeout?: number;
    reauthenticationThreshold?: number;
    requestTimeout?: number;
    enforceRequestTimeout?: boolean;
    retry?: RetryOptions;
    socketFactory?: ISocketFactory;
    logLevel?: logLevel;
    logCreator?: logCreator;
}
export interface ISocketFactoryArgs {
    host: string;
    port: number;
    ssl: tls.ConnectionOptions;
    onConnect: () => void;
}
export declare type ISocketFactory = (args: ISocketFactoryArgs) => net.Socket;
export interface OauthbearerProviderResponse {
    value: string;
}
declare type SASLMechanismOptionsMap = {
    plain: {
        username: string;
        password: string;
    };
    'scram-sha-256': {
        username: string;
        password: string;
    };
    'scram-sha-512': {
        username: string;
        password: string;
    };
    aws: {
        authorizationIdentity: string;
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
    };
    oauthbearer: {
        oauthBearerProvider: () => Promise<OauthbearerProviderResponse>;
    };
};
export declare type SASLMechanism = keyof SASLMechanismOptionsMap;
declare type SASLMechanismOptions<T> = T extends SASLMechanism ? {
    mechanism: T;
} & SASLMechanismOptionsMap[T] : never;
export declare type SASLOptions = SASLMechanismOptions<SASLMechanism>;
export interface ProducerConfig {
    createPartitioner?: ICustomPartitioner;
    retry?: RetryOptions;
    metadataMaxAge?: number;
    allowAutoTopicCreation?: boolean;
    idempotent?: boolean;
    transactionalId?: string;
    transactionTimeout?: number;
    maxInFlightRequests?: number;
}
export interface Message {
    key?: Buffer | string | null;
    value: Buffer | string | null;
    partition?: number;
    headers?: IHeaders;
    timestamp?: string;
}
export interface PartitionerArgs {
    topic: string;
    partitionMetadata: PartitionMetadata[];
    message: Message;
}
export declare type ICustomPartitioner = () => (args: PartitionerArgs) => number;
export declare type DefaultPartitioner = ICustomPartitioner;
export declare type JavaCompatiblePartitioner = ICustomPartitioner;
export declare let Partitioners: {
    DefaultPartitioner: DefaultPartitioner;
    JavaCompatiblePartitioner: JavaCompatiblePartitioner;
};
export declare type PartitionMetadata = {
    partitionErrorCode: number;
    partitionId: number;
    leader: number;
    replicas: number[];
    isr: number[];
    offlineReplicas?: number[];
};
export interface IHeaders {
    [key: string]: Buffer | string | undefined;
}
export interface ConsumerConfig {
    groupId: string;
    partitionAssigners?: PartitionAssigner[];
    metadataMaxAge?: number;
    sessionTimeout?: number;
    rebalanceTimeout?: number;
    heartbeatInterval?: number;
    maxBytesPerPartition?: number;
    minBytes?: number;
    maxBytes?: number;
    maxWaitTimeInMs?: number;
    retry?: RetryOptions & {
        restartOnFailure?: (err: Error) => Promise<boolean>;
    };
    allowAutoTopicCreation?: boolean;
    maxInFlightRequests?: number;
    readUncommitted?: boolean;
    rackId?: string;
}
export declare type PartitionAssigner = (config: {
    cluster: Cluster;
}) => Assigner;
export interface CoordinatorMetadata {
    errorCode: number;
    coordinator: {
        nodeId: number;
        host: string;
        port: number;
    };
}
export declare type Cluster = {
    isConnected(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    refreshMetadata(): Promise<void>;
    refreshMetadataIfNecessary(): Promise<void>;
    addTargetTopic(topic: string): Promise<void>;
    findBroker(node: {
        nodeId: string;
    }): Promise<Broker>;
    findControllerBroker(): Promise<Broker>;
    findTopicPartitionMetadata(topic: string): PartitionMetadata[];
    findLeaderForPartitions(topic: string, partitions: number[]): {
        [leader: string]: number[];
    };
    findGroupCoordinator(group: {
        groupId: string;
    }): Promise<Broker>;
    findGroupCoordinatorMetadata(group: {
        groupId: string;
    }): Promise<CoordinatorMetadata>;
    defaultOffset(config: {
        fromBeginning: boolean;
    }): number;
    fetchTopicsOffset(topics: Array<{
        topic: string;
        partitions: Array<{
            partition: number;
        }>;
    } & XOR<{
        fromBeginning: boolean;
    }, {
        fromTimestamp: number;
    }>>): Promise<{
        topic: string;
        partitions: Array<{
            partition: number;
            offset: string;
        }>;
    }>;
};
export declare type Assignment = {
    [topic: string]: number[];
};
export declare type GroupMember = {
    memberId: string;
    memberMetadata: Buffer;
};
export declare type GroupMemberAssignment = {
    memberId: string;
    memberAssignment: Buffer;
};
export declare type GroupState = {
    name: string;
    metadata: Buffer;
};
export declare type Assigner = {
    name: string;
    version: number;
    assign(group: {
        members: GroupMember[];
        topics: string[];
    }): Promise<GroupMemberAssignment[]>;
    protocol(subscription: {
        topics: string[];
    }): GroupState;
};
export interface RetryOptions {
    maxRetryTime?: number;
    initialRetryTime?: number;
    factor?: number;
    multiplier?: number;
    retries?: number;
}
export interface AdminConfig {
    retry?: RetryOptions;
}
export interface ITopicConfig {
    topic: string;
    numPartitions?: number;
    replicationFactor?: number;
    replicaAssignment?: object[];
    configEntries?: object[];
}
export interface ITopicPartitionConfig {
    topic: string;
    count: number;
    assignments?: Array<Array<number>>;
}
export interface ITopicMetadata {
    name: string;
    partitions: PartitionMetadata[];
}
/**
 * @deprecated
 * Use ConfigResourceTypes or AclResourceTypes
 */
export declare enum ResourceTypes {
    UNKNOWN = 0,
    ANY = 1,
    TOPIC = 2,
    GROUP = 3,
    CLUSTER = 4,
    TRANSACTIONAL_ID = 5,
    DELEGATION_TOKEN = 6
}
export declare enum AclResourceTypes {
    UNKNOWN = 0,
    ANY = 1,
    TOPIC = 2,
    GROUP = 3,
    CLUSTER = 4,
    TRANSACTIONAL_ID = 5,
    DELEGATION_TOKEN = 6
}
export declare enum ConfigResourceTypes {
    UNKNOWN = 0,
    TOPIC = 2,
    BROKER = 4,
    BROKER_LOGGER = 8
}
export declare enum AclPermissionTypes {
    UNKNOWN = 0,
    ANY = 1,
    DENY = 2,
    ALLOW = 3
}
export declare enum AclOperationTypes {
    UNKNOWN = 0,
    ANY = 1,
    ALL = 2,
    READ = 3,
    WRITE = 4,
    CREATE = 5,
    DELETE = 6,
    ALTER = 7,
    DESCRIBE = 8,
    CLUSTER_ACTION = 9,
    DESCRIBE_CONFIGS = 10,
    ALTER_CONFIGS = 11,
    IDEMPOTENT_WRITE = 12
}
export declare enum ResourcePatternTypes {
    UNKNOWN = 0,
    ANY = 1,
    MATCH = 2,
    LITERAL = 3,
    PREFIXED = 4
}
export interface ResourceConfigQuery {
    type: ResourceTypes | ConfigResourceTypes;
    name: string;
    configNames?: string[];
}
export interface ConfigEntries {
    configName: string;
    configValue: string;
    isDefault: boolean;
    isSensitive: boolean;
    readOnly: boolean;
    configSynonyms: ConfigSynonyms[];
}
export interface ConfigSynonyms {
    configName: string;
    configValue: string;
    configSource: number;
}
export interface DescribeConfigResponse {
    resources: {
        configEntries: ConfigEntries[];
        errorCode: number;
        errorMessage: string;
        resourceName: string;
        resourceType: ResourceTypes | ConfigResourceTypes;
    }[];
    throttleTime: number;
}
export interface IResourceConfig {
    type: ResourceTypes | ConfigResourceTypes;
    name: string;
    configEntries: {
        name: string;
        value: string;
    }[];
}
declare type ValueOf<T> = T[keyof T];
export declare type AdminEvents = {
    CONNECT: 'admin.connect';
    DISCONNECT: 'admin.disconnect';
    REQUEST: 'admin.network.request';
    REQUEST_TIMEOUT: 'admin.network.request_timeout';
    REQUEST_QUEUE_SIZE: 'admin.network.request_queue_size';
};
export interface InstrumentationEvent<T> {
    id: string;
    type: string;
    timestamp: number;
    payload: T;
}
export declare type RemoveInstrumentationEventListener<T> = () => void;
export declare type ConnectEvent = InstrumentationEvent<null>;
export declare type DisconnectEvent = InstrumentationEvent<null>;
export declare type RequestEvent = InstrumentationEvent<{
    apiKey: number;
    apiName: string;
    apiVersion: number;
    broker: string;
    clientId: string;
    correlationId: number;
    createdAt: number;
    duration: number;
    pendingDuration: number;
    sentAt: number;
    size: number;
}>;
export declare type RequestTimeoutEvent = InstrumentationEvent<{
    apiKey: number;
    apiName: string;
    apiVersion: number;
    broker: string;
    clientId: string;
    correlationId: number;
    createdAt: number;
    pendingDuration: number;
    sentAt: number;
}>;
export declare type RequestQueueSizeEvent = InstrumentationEvent<{
    broker: string;
    clientId: string;
    queueSize: number;
}>;
export interface SeekEntry {
    partition: number;
    offset: string;
}
export interface Acl {
    principal: string;
    host: string;
    operation: AclOperationTypes;
    permissionType: AclPermissionTypes;
}
export interface AclResource {
    resourceType: AclResourceTypes;
    resourceName: string;
    resourcePatternType: ResourcePatternTypes;
}
export declare type AclEntry = Acl & AclResource;
export declare type DescribeAclResource = AclResource & {
    acl: Acl[];
};
export interface DescribeAclResponse {
    throttleTime: number;
    errorCode: number;
    errorMessage?: string;
    resources: DescribeAclResource[];
}
export interface AclFilter {
    resourceType: AclResourceTypes;
    resourceName?: string;
    resourcePatternType: ResourcePatternTypes;
    principal?: string;
    host?: string;
    operation: AclOperationTypes;
    permissionType: AclPermissionTypes;
}
export interface MatchingAcl {
    errorCode: number;
    errorMessage?: string;
    resourceType: AclResourceTypes;
    resourceName: string;
    resourcePatternType: ResourcePatternTypes;
    principal: string;
    host: string;
    operation: AclOperationTypes;
    permissionType: AclPermissionTypes;
}
export interface DeleteAclFilterResponses {
    errorCode: number;
    errorMessage?: string;
    matchingAcls: MatchingAcl[];
}
export interface DeleteAclResponse {
    throttleTime: number;
    filterResponses: DeleteAclFilterResponses[];
}
export declare type Admin = {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    listTopics(): Promise<string[]>;
    createTopics(options: {
        validateOnly?: boolean;
        waitForLeaders?: boolean;
        timeout?: number;
        topics: ITopicConfig[];
    }): Promise<boolean>;
    deleteTopics(options: {
        topics: string[];
        timeout?: number;
    }): Promise<void>;
    createPartitions(options: {
        validateOnly?: boolean;
        timeout?: number;
        topicPartitions: ITopicPartitionConfig[];
    }): Promise<boolean>;
    fetchTopicMetadata(options?: {
        topics: string[];
    }): Promise<{
        topics: Array<ITopicMetadata>;
    }>;
    fetchOffsets(options: {
        groupId: string;
        topic: string;
        resolveOffsets?: boolean;
    }): Promise<Array<SeekEntry & {
        metadata: string | null;
    }>>;
    fetchTopicOffsets(topic: string): Promise<Array<SeekEntry & {
        high: string;
        low: string;
    }>>;
    fetchTopicOffsetsByTimestamp(topic: string, timestamp?: number): Promise<Array<SeekEntry>>;
    describeCluster(): Promise<{
        brokers: Array<{
            nodeId: number;
            host: string;
            port: number;
        }>;
        controller: number | null;
        clusterId: string;
    }>;
    setOffsets(options: {
        groupId: string;
        topic: string;
        partitions: SeekEntry[];
    }): Promise<void>;
    resetOffsets(options: {
        groupId: string;
        topic: string;
        earliest: boolean;
    }): Promise<void>;
    describeConfigs(configs: {
        resources: ResourceConfigQuery[];
        includeSynonyms: boolean;
    }): Promise<DescribeConfigResponse>;
    alterConfigs(configs: {
        validateOnly: boolean;
        resources: IResourceConfig[];
    }): Promise<any>;
    listGroups(): Promise<{
        groups: GroupOverview[];
    }>;
    deleteGroups(groupIds: string[]): Promise<DeleteGroupsResult[]>;
    describeGroups(groupIds: string[]): Promise<GroupDescriptions>;
    describeAcls(options: AclFilter): Promise<DescribeAclResponse>;
    deleteAcls(options: {
        filters: AclFilter[];
    }): Promise<DeleteAclResponse>;
    createAcls(options: {
        acl: AclEntry[];
    }): Promise<boolean>;
    deleteTopicRecords(options: {
        topic: string;
        partitions: SeekEntry[];
    }): Promise<void>;
    logger(): Logger;
    on(eventName: ValueOf<AdminEvents>, listener: (...args: any[]) => void): RemoveInstrumentationEventListener<typeof eventName>;
    events: AdminEvents;
};
export declare let PartitionAssigners: {
    roundRobin: PartitionAssigner;
};
export interface ISerializer<T> {
    encode(value: T): Buffer;
    decode(buffer: Buffer): T | null;
}
export declare type MemberMetadata = {
    version: number;
    topics: string[];
    userData: Buffer;
};
export declare type MemberAssignment = {
    version: number;
    assignment: Assignment;
    userData: Buffer;
};
export declare let AssignerProtocol: {
    MemberMetadata: ISerializer<MemberMetadata>;
    MemberAssignment: ISerializer<MemberAssignment>;
};
export declare enum logLevel {
    NOTHING = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 4,
    DEBUG = 5
}
export interface LogEntry {
    namespace: string;
    level: logLevel;
    label: string;
    log: LoggerEntryContent;
}
export interface LoggerEntryContent {
    readonly timestamp: Date;
    readonly message: string;
    [key: string]: any;
}
export declare type logCreator = (logLevel: logLevel) => (entry: LogEntry) => void;
export declare type Logger = {
    info: (message: string, extra?: object) => void;
    error: (message: string, extra?: object) => void;
    warn: (message: string, extra?: object) => void;
    debug: (message: string, extra?: object) => void;
};
export declare type Broker = {
    isConnected(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    apiVersions(): Promise<{
        [apiKey: number]: {
            minVersion: number;
            maxVersion: number;
        };
    }>;
    metadata(topics: string[]): Promise<{
        brokers: Array<{
            nodeId: number;
            host: string;
            port: number;
            rack?: string;
        }>;
        topicMetadata: Array<{
            topicErrorCode: number;
            topic: number;
            partitionMetadata: PartitionMetadata[];
        }>;
    }>;
    offsetCommit(request: {
        groupId: string;
        groupGenerationId: number;
        memberId: string;
        retentionTime?: number;
        topics: Array<{
            topic: string;
            partitions: Array<{
                partition: number;
                offset: string;
            }>;
        }>;
    }): Promise<any>;
    fetch(request: {
        replicaId?: number;
        isolationLevel?: number;
        maxWaitTime?: number;
        minBytes?: number;
        maxBytes?: number;
        topics: Array<{
            topic: string;
            partitions: Array<{
                partition: number;
                fetchOffset: string;
                maxBytes: number;
            }>;
        }>;
        rackId?: string;
    }): Promise<any>;
};
export declare type KafkaMessage = {
    key: Buffer;
    value: Buffer | null;
    timestamp: string;
    size: number;
    attributes: number;
    offset: string;
    headers?: IHeaders;
};
export interface ProducerRecord {
    topic: string;
    messages: Message[];
    acks?: number;
    timeout?: number;
    compression?: CompressionTypes;
}
export declare type RecordMetadata = {
    topicName: string;
    partition: number;
    errorCode: number;
    offset?: string;
    timestamp?: string;
    baseOffset?: string;
    logAppendTime?: string;
    logStartOffset?: string;
};
export interface TopicMessages {
    topic: string;
    messages: Message[];
}
export interface ProducerBatch {
    acks?: number;
    timeout?: number;
    compression?: CompressionTypes;
    topicMessages?: TopicMessages[];
}
export interface PartitionOffset {
    partition: number;
    offset: string;
}
export interface TopicOffsets {
    topic: string;
    partitions: PartitionOffset[];
}
export interface Offsets {
    topics: TopicOffsets[];
}
declare type Sender = {
    send(record: ProducerRecord): Promise<RecordMetadata[]>;
    sendBatch(batch: ProducerBatch): Promise<RecordMetadata[]>;
};
export declare type ProducerEvents = {
    CONNECT: 'producer.connect';
    DISCONNECT: 'producer.disconnect';
    REQUEST: 'producer.network.request';
    REQUEST_TIMEOUT: 'producer.network.request_timeout';
    REQUEST_QUEUE_SIZE: 'producer.network.request_queue_size';
};
export declare type Producer = Sender & {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isIdempotent(): boolean;
    events: ProducerEvents;
    on(eventName: ValueOf<ProducerEvents>, listener: (...args: any[]) => void): RemoveInstrumentationEventListener<typeof eventName>;
    transaction(): Promise<Transaction>;
    logger(): Logger;
};
export declare type Transaction = Sender & {
    sendOffsets(offsets: Offsets & {
        consumerGroupId: string;
    }): Promise<void>;
    commit(): Promise<void>;
    abort(): Promise<void>;
    isActive(): boolean;
};
export declare type ConsumerGroup = {
    groupId: string;
    generationId: number;
    memberId: string;
    coordinator: Broker;
};
export declare type MemberDescription = {
    clientHost: string;
    clientId: string;
    memberId: string;
    memberAssignment: Buffer;
    memberMetadata: Buffer;
};
export declare type ConsumerGroupState = 'Unknown' | 'PreparingRebalance' | 'CompletingRebalance' | 'Stable' | 'Dead' | 'Empty';
export declare type GroupDescription = {
    groupId: string;
    members: MemberDescription[];
    protocol: string;
    protocolType: string;
    state: ConsumerGroupState;
};
export declare type GroupDescriptions = {
    groups: GroupDescription[];
};
export declare type TopicPartitions = {
    topic: string;
    partitions: number[];
};
export declare type TopicPartitionOffsetAndMetadata = {
    topic: string;
    partition: number;
    offset: string;
    metadata?: string | null;
};
export declare type TopicPartitionOffsetAndMedata = TopicPartitionOffsetAndMetadata;
export declare type Batch = {
    topic: string;
    partition: number;
    highWatermark: string;
    messages: KafkaMessage[];
    isEmpty(): boolean;
    firstOffset(): string | null;
    lastOffset(): string;
    offsetLag(): string;
    offsetLagLow(): string;
};
export declare type GroupOverview = {
    groupId: string;
    protocolType: string;
};
export declare type DeleteGroupsResult = {
    groupId: string;
    errorCode?: number;
    error?: KafkaJSProtocolError;
};
export declare type ConsumerEvents = {
    HEARTBEAT: 'consumer.heartbeat';
    COMMIT_OFFSETS: 'consumer.commit_offsets';
    GROUP_JOIN: 'consumer.group_join';
    FETCH_START: 'consumer.fetch_start';
    FETCH: 'consumer.fetch';
    START_BATCH_PROCESS: 'consumer.start_batch_process';
    END_BATCH_PROCESS: 'consumer.end_batch_process';
    CONNECT: 'consumer.connect';
    DISCONNECT: 'consumer.disconnect';
    STOP: 'consumer.stop';
    CRASH: 'consumer.crash';
    RECEIVED_UNSUBSCRIBED_TOPICS: 'consumer.received_unsubscribed_topics';
    REQUEST: 'consumer.network.request';
    REQUEST_TIMEOUT: 'consumer.network.request_timeout';
    REQUEST_QUEUE_SIZE: 'consumer.network.request_queue_size';
};
export declare type ConsumerHeartbeatEvent = InstrumentationEvent<{
    groupId: string;
    memberId: string;
    groupGenerationId: number;
}>;
export declare type ConsumerCommitOffsetsEvent = InstrumentationEvent<{
    groupId: string;
    memberId: string;
    groupGenerationId: number;
    topics: {
        topic: string;
        partitions: {
            offset: string;
            partition: string;
        }[];
    }[];
}>;
export interface IMemberAssignment {
    [key: string]: number[];
}
export declare type ConsumerGroupJoinEvent = InstrumentationEvent<{
    duration: number;
    groupId: string;
    isLeader: boolean;
    leaderId: string;
    groupProtocol: string;
    memberId: string;
    memberAssignment: IMemberAssignment;
}>;
export declare type ConsumerFetchEvent = InstrumentationEvent<{
    numberOfBatches: number;
    duration: number;
}>;
interface IBatchProcessEvent {
    topic: string;
    partition: number;
    highWatermark: string;
    offsetLag: string;
    offsetLagLow: string;
    batchSize: number;
    firstOffset: string;
    lastOffset: string;
}
export declare type ConsumerStartBatchProcessEvent = InstrumentationEvent<IBatchProcessEvent>;
export declare type ConsumerEndBatchProcessEvent = InstrumentationEvent<IBatchProcessEvent & {
    duration: number;
}>;
export declare type ConsumerCrashEvent = InstrumentationEvent<{
    error: Error;
    groupId: string;
    restart: boolean;
}>;
export declare type ConsumerReceivedUnsubcribedTopicsEvent = InstrumentationEvent<{
    groupId: string;
    generationId: number;
    memberId: string;
    assignedTopics: string[];
    topicsSubscribed: string[];
    topicsNotSubscribed: string[];
}>;
export interface OffsetsByTopicPartition {
    topics: TopicOffsets[];
}
export interface EachMessagePayload {
    topic: string;
    partition: number;
    message: KafkaMessage;
}
export interface EachBatchPayload {
    batch: Batch;
    resolveOffset(offset: string): void;
    heartbeat(): Promise<void>;
    commitOffsetsIfNecessary(offsets?: Offsets): Promise<void>;
    uncommittedOffsets(): OffsetsByTopicPartition;
    isRunning(): boolean;
    isStale(): boolean;
}
/**
 * Type alias to keep compatibility with @types/kafkajs
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/712ad9d59ccca6a3cc92f347fea0d1c7b02f5eeb/types/kafkajs/index.d.ts#L321-L325
 */
export declare type ConsumerEachMessagePayload = EachMessagePayload;
/**
 * Type alias to keep compatibility with @types/kafkajs
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/712ad9d59ccca6a3cc92f347fea0d1c7b02f5eeb/types/kafkajs/index.d.ts#L327-L336
 */
export declare type ConsumerEachBatchPayload = EachBatchPayload;
export declare type ConsumerRunConfig = {
    autoCommit?: boolean;
    autoCommitInterval?: number | null;
    autoCommitThreshold?: number | null;
    eachBatchAutoResolve?: boolean;
    partitionsConsumedConcurrently?: number;
    eachBatch?: (payload: EachBatchPayload) => Promise<void>;
    eachMessage?: (payload: EachMessagePayload) => Promise<void>;
};
export declare type ConsumerSubscribeTopic = {
    topic: string | RegExp;
    fromBeginning?: boolean;
};
export declare type Consumer = {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    subscribe(topic: ConsumerSubscribeTopic): Promise<void>;
    stop(): Promise<void>;
    run(config?: ConsumerRunConfig): Promise<void>;
    commitOffsets(topicPartitions: Array<TopicPartitionOffsetAndMetadata>): Promise<void>;
    seek(topicPartition: {
        topic: string;
        partition: number;
        offset: string;
    }): void;
    describeGroup(): Promise<GroupDescription>;
    pause(topics: Array<{
        topic: string;
        partitions?: number[];
    }>): void;
    paused(): TopicPartitions[];
    resume(topics: Array<{
        topic: string;
        partitions?: number[];
    }>): void;
    on(eventName: ValueOf<ConsumerEvents>, listener: (...args: any[]) => void): RemoveInstrumentationEventListener<typeof eventName>;
    logger(): Logger;
    events: ConsumerEvents;
};
export declare enum CompressionTypes {
    None = 0,
    GZIP = 1,
    Snappy = 2,
    LZ4 = 3,
    ZSTD = 4
}
export declare let CompressionCodecs: {
    [CompressionTypes.GZIP]: () => any;
    [CompressionTypes.Snappy]: () => any;
    [CompressionTypes.LZ4]: () => any;
    [CompressionTypes.ZSTD]: () => any;
};
export declare class KafkaJSError extends Error {
    readonly message: Error['message'];
    readonly name: string;
    readonly retriable: boolean;
    readonly helpUrl?: string;
    constructor(e: Error | string, metadata?: KafkaJSErrorMetadata);
}
export declare class KafkaJSNonRetriableError extends KafkaJSError {
    constructor(e: Error | string);
}
export declare class KafkaJSProtocolError extends KafkaJSError {
    readonly code: number;
    readonly type: string;
    constructor(e: Error | string);
}
export declare class KafkaJSOffsetOutOfRange extends KafkaJSProtocolError {
    readonly topic: string;
    readonly partition: number;
    constructor(e: Error | string, metadata?: KafkaJSOffsetOutOfRangeMetadata);
}
export declare class KafkaJSNumberOfRetriesExceeded extends KafkaJSNonRetriableError {
    readonly stack: string;
    readonly originalError: Error;
    readonly retryCount: number;
    readonly retryTime: number;
    constructor(e: Error | string, metadata?: KafkaJSNumberOfRetriesExceededMetadata);
}
export declare class KafkaJSConnectionError extends KafkaJSError {
    readonly broker: string;
    constructor(e: Error | string, metadata?: KafkaJSConnectionErrorMetadata);
}
export declare class KafkaJSRequestTimeoutError extends KafkaJSError {
    readonly broker: string;
    readonly correlationId: number;
    readonly createdAt: number;
    readonly sentAt: number;
    readonly pendingDuration: number;
    constructor(e: Error | string, metadata?: KafkaJSRequestTimeoutErrorMetadata);
}
export declare class KafkaJSMetadataNotLoaded extends KafkaJSError {
    constructor();
}
export declare class KafkaJSTopicMetadataNotLoaded extends KafkaJSMetadataNotLoaded {
    readonly topic: string;
    constructor(e: Error | string, metadata?: KafkaJSTopicMetadataNotLoadedMetadata);
}
export declare class KafkaJSStaleTopicMetadataAssignment extends KafkaJSError {
    readonly topic: string;
    readonly unknownPartitions: number;
    constructor(e: Error | string, metadata?: KafkaJSStaleTopicMetadataAssignmentMetadata);
}
export declare class KafkaJSServerDoesNotSupportApiKey extends KafkaJSNonRetriableError {
    readonly apiKey: number;
    readonly apiName: string;
    constructor(e: Error | string, metadata?: KafkaJSServerDoesNotSupportApiKeyMetadata);
}
export declare class KafkaJSBrokerNotFound extends KafkaJSError {
    constructor();
}
export declare class KafkaJSPartialMessageError extends KafkaJSError {
    constructor();
}
export declare class KafkaJSSASLAuthenticationError extends KafkaJSError {
    constructor();
}
export declare class KafkaJSGroupCoordinatorNotFound extends KafkaJSError {
    constructor();
}
export declare class KafkaJSNotImplemented extends KafkaJSError {
    constructor();
}
export declare class KafkaJSTimeout extends KafkaJSError {
    constructor();
}
export declare class KafkaJSLockTimeout extends KafkaJSError {
    constructor();
}
export declare class KafkaJSUnsupportedMagicByteInMessageSet extends KafkaJSError {
    constructor();
}
export declare class KafkaJSDeleteGroupsError extends KafkaJSError {
    readonly groups: DeleteGroupsResult[];
    constructor(e: Error | string, groups?: KafkaJSDeleteGroupsErrorGroups[]);
}
export declare class KafkaJSDeleteTopicRecordsError extends KafkaJSError {
    constructor(metadata: KafkaJSDeleteTopicRecordsErrorTopic);
}
export interface KafkaJSDeleteGroupsErrorGroups {
    groupId: string;
    errorCode: number;
    error: KafkaJSError;
}
export interface KafkaJSDeleteTopicRecordsErrorTopic {
    topic: string;
    partitions: KafkaJSDeleteTopicRecordsErrorPartition[];
}
export interface KafkaJSDeleteTopicRecordsErrorPartition {
    partition: number;
    offset: string;
    error: KafkaJSError;
}
export interface KafkaJSErrorMetadata {
    retriable?: boolean;
    topic?: string;
    partitionId?: number;
    metadata?: PartitionMetadata;
}
export interface KafkaJSOffsetOutOfRangeMetadata {
    topic: string;
    partition: number;
}
export interface KafkaJSNumberOfRetriesExceededMetadata {
    retryCount: number;
    retryTime: number;
}
export interface KafkaJSConnectionErrorMetadata {
    broker?: string;
    code?: string;
}
export interface KafkaJSRequestTimeoutErrorMetadata {
    broker: string;
    clientId: string;
    correlationId: number;
    createdAt: number;
    sentAt: number;
    pendingDuration: number;
}
export interface KafkaJSTopicMetadataNotLoadedMetadata {
    topic: string;
}
export interface KafkaJSStaleTopicMetadataAssignmentMetadata {
    topic: string;
    unknownPartitions: PartitionMetadata[];
}
export interface KafkaJSServerDoesNotSupportApiKeyMetadata {
    apiKey: number;
    apiName: string;
}
export {};
