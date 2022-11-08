<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NAvatar } from 'naive-ui'
import type { DataTableColumns, DataTableBaseColumn, DataTableFilterState } from 'naive-ui'
import { AngleDown } from '@vicons/fa'

interface Member {
  memberId: string | number // QQ 号
  name: string // 显示名称
  permission: string // 群权限
  specialTitle?: string // 特殊头衔
  joinTimestamp?: string | number // 加入时间
  lastSpeekTimestamp?: string | number // 最后发言时间
}

const router = useRouter()
const data = ref<Member[]>([])
const loadingRef = ref(true)
const options = [
  {
    label: '催更',
    key: '1',
  },
  {
    label: '催更',
    key: '2',
  },
  {
    label: '催更',
    key: '3',
  },
]

const permissionColumn = reactive<DataTableBaseColumn<Member>>({
  key: 'permission',
  title: '权限',
  width: '80px',
  align: 'center',
  filterMultiple: false,
  filterOptionValue: null,
  filterOptions: [
    {
      label: '成员',
      value: '成员',
    },
    {
      label: '管理员',
      value: '管理员',
    },
    {
      label: '群主',
      value: '群主',
    },
  ],
  filter: (value, row) => {
    return row.permission === value.toString()
  },
})

const columns = ref<DataTableColumns<Member>>([
  {
    key: 'memberId',
    title: 'QQ号',
    width: '130px',
    sortOrder: false,
    sorter: (rowA: any, rowB: any) => {
      return rowA.id - rowB.id
    },
  },
  {
    key: 'name',
    title: '群昵称',
    render: (rowData) =>
      h('span', { style: 'display: flex; align-items: center' }, [
        h(NAvatar, {
          src: `https://q1.qlogo.cn/g?b=qq&nk=${rowData.memberId}&s=100`,
          size: 35,
          round: true,
          objectFit: 'cover',
          style: { marginRight: '5px', flexShrink: 0 },
        }),
        h('span', { style: '' }, rowData.name),
      ]),
  },
  permissionColumn,
  {
    key: 'specialTitle',
    title: '头衔',
  },
  {
    key: 'joinTimestamp',
    title: '入群时间',
  },
  {
    key: 'lastSpeekTimestamp',
    title: '上次发言时间',
  },
  {
    key: 'operation',
    title: '操作',
    minWidth: 100,
    width: '10%',
    align: 'center',
    render: (rowData) =>
      h(
        NButton,
        { size: 'small', type: 'error', style: { margin: '0 5px' }, ghost: true },
        () => '踢出'
      ),
  },
])

function query() {
  // $lib.requests.get({
  //   url: 'http://127.0.0.1:8000/api/group_list',
  //   success: (res: ResultGroup[]) => {
  //     // data.value = res
  //     res.forEach((group) => {
  //       data.value.push({
  //         id: group.id,
  //         name: group.name,
  //         permission: { MEMBER: '成员', ADMINISTRATOR: '管理员', OWNER: '群主' }[group.permission],
  //       })
  //     })
  //     total.value = res.length
  //   },
  //   complete: () => (loadingRef.value = false),
  // })
  for (let index = 0; index < 100; index++) {
    data.value.push({
      memberId: '2948531755',
      name: index.toString(),
      permission: '成员',
      specialTitle: 'awa',
    })
    loadingRef.value = false
  }
}

function handleSorterChange(sorter: { columnKey: any; order: any }) {
  // @ts-ignore
  columns.value.forEach((column: DataTableBaseColumn<DataGroup>) => {
    /** column.sortOrder !== undefined means it is uncontrolled */
    if (column.sortOrder === undefined) return
    if (!sorter) {
      column.sortOrder = false
      return
    }
    if (column.key === sorter.columnKey) column.sortOrder = sorter.order
    else column.sortOrder = false
  })
}

function handleUpdateFilter(filters: DataTableFilterState, sourceColumn: DataTableBaseColumn) {
  permissionColumn.filterOptionValue = filters[sourceColumn.key] as string
}

onMounted(() => query())
</script>

<template>
  <section class="section">
    <n-page-header subtitle="941310484" @back="router.go(-1)">
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="人数" value="285 人" />
        </n-gi>
        <n-gi>
          <n-statistic label="入群时间" value="2022/11/3 23:10" />
        </n-gi>
        <n-gi>
          <n-statistic label="最后发言" value="2022/11/3 23:10" />
        </n-gi>
        <n-gi>
          <n-statistic label="头衔" value="菜狗" />
        </n-gi>
        <n-gi>
          <n-statistic label="权限" value="成员" />
        </n-gi>
      </n-grid>
      <template #title>
        <span>Graia Framework Community</span>
      </template>
      <template #avatar>
        <n-avatar
          src="https://p.qlogo.cn/gh/941310484/941310484/"
          :size="35"
          object-fit="cover"
          round
        />
      </template>
      <template #extra>
        <span>
          <n-button type="error" ghost>退群</n-button>
          <n-dropdown :options="options" size="medium">
            <span style="height: 100%">
              <angle-down
                style="
                  height: 20px;
                  vertical-align: middle;
                  cursor: pointer;
                  padding: 0 5px;
                  margin-left: 5px;
                "
              />
            </span>
          </n-dropdown>
        </span>
      </template>
    </n-page-header>
    <n-data-table
      style="margin-top: 20px"
      :columns="columns"
      :data="data"
      :loading="loadingRef"
      :pagination="{ pageSize: 15 }"
      @update:sorter="handleSorterChange"
      @update:filters="handleUpdateFilter"
    />
  </section>
</template>

<style lang="scss" scoped>
.section {
  margin: 0 20px;
}
</style>
