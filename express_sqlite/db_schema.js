/** Схемы апи */

// host
const hostSchema = {
    "data_plane_total": 'Number',
    "data_plane_used": 'Number',
    "data_plane_vvf_backups": 'Number',
    "data_plane_without_vvf": 'Number',
    "interfaces_connected_to_bridge": 'Number',
    "interfaces_total": 'Number',
    "interfaces_used_by_system": 'Number',
    "interfaces_used_by_vvfs": 'Number',
    "memory_total": 'Number',
    "memory_used_by_system": 'Number',
    "operation_mode": 'String',
    "storage_total": 'Number',
    "storage_used_by_system": 'Number',
    "storage_used_by_vvf": 'Number',
    "threads_total": 'Number',
    "threads_used_by_system": 'Number',
    "vvf_memory_total": 'Number',
    "vvf_threads_total": 'Number'
}

// host -> nics
const hostNicsSchema = {
    "name": "String",
    "device": "String",
    "slot": "String",
    "driver": "String",
    "ip": "String",
    "mac": "String",
    "link_is_up": "Boolean",
    "state_is_up": "Boolean"
}

export { hostSchema, hostNicsSchema }