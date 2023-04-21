<template>
  <div class="h-full flex justify-between border-b-#ccc bg-white py-2 dark:bg-dark">
    <div class="left-side">
      <Breadcrumb />
    </div>
    <ul class="right-side">
      <li v-for="(item, index) in alarmNumList" :key="index" class="no-item" @click="showCurrent(item.key)">
        <a-tooltip :content="item.value" position="bottom" :offset="-10">
          <span class="flex-center">
            <i :class="item.icon" text-xl />
            <span class="ml-sm font-500">{{ item.num > 99 ? '99+' : item.num }}</span>
          </span>
        </a-tooltip>
      </li>
      <!-- <div ml-md mr-base flex-center>
        <a-tooltip position="bottom" :offset="-10">
          <button class="icon-btn !outline-none" @click="changeDark()">
            <i class="i-carbon-sun dark:i-carbon-moon text-xl" />
          </button>
        </a-tooltip>
      </div> -->
      <!--
      <div mr-md flex-center>
        <a-dropdown trigger="click" @select="setLocale as any">
          <a-button class="nav-btn" type="outline">
            <template #icon>
              <div class="i-carbon-language text-xl" />
            </template>
          </a-button>
          <template #content>
            <a-doption v-for="item in localesList" :key="item.value" :value="item.value">
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </div> -->
      <li>
        <a-dropdown trigger="click">
          <div flex-center>
            <a-avatar :size="40" class="bg-white!">
              <span class="i-custom:avater h-36px w-36px" />
            </a-avatar>
            <div pl-xs>{{ username }}</div>
            <icon-down pl-xs size="18" />
          </div>

          <template #content>
            <!-- <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>
                  {{ t('navbar.securitySetting') }}
                </span>
              </a-space>
            </a-doption> -->
            <a-doption>
              <a-space @click="lintToDocs">
                <icon-book />
                <span>
                  <a href="https://argus.zmops.cn/docs/" target="_blank">
                    {{ t('navbar.docs') }}
                  </a>
                </span>
              </a-space>
            </a-doption>

            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ t('navbar.logOut') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { localesList, setLocale } from '@/locales';
import { useUserStore } from '@/store';
import { getAlertsSummary } from '@/service/api';
import { WARN_LEVEL } from '@/utils/constants';

const userStore = useUserStore();
const currentLocale = getLocale();
const router = useRouter();
const { username } = userStore.userInfo;

const alarmNumList = ref(WARN_LEVEL.filter(item => item.key !== -1));

const handleLogout = () => {
  userStore.logout();

  router.push({
    path: '/login'
  });
};

const changeDark = () => {

  const mode = toggleDark();
  document.body.setAttribute('arco-theme', mode ? 'dark' : 'light');

};

const switchRoles = async () => {

};

const lintToDocs = () => {
  window.open('https://argus.zmops.cn/');
};

const getData = () => {
  getAlertsSummary().then((res) => {
    if (res.data) {
      alarmNumList.value.forEach((item) => {
        if (item.key === 2) {
          item.num = res.data.priorityEmergencyNum;
          item.icon = 'i-custom:alarm';
        }
        if (item.key === 1) {
          item.num = res.data.priorityCriticalNum;
          item.icon = 'i-custom:ordinary';
        }
        if (item.key === 0) {
          item.num = res.data.priorityWarningNum;
          item.icon = 'i-custom:prompt';
        }
      });
    }
  });
};

const showCurrent = (id: string | number) => {
  router.push('/warn/warnInfo?type=' + id);
};

onMounted(() => {
  getData();
});
</script>

<style scoped lang="scss">
.user-avatar {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
}

.navbar {
  display: flex;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border: none;
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
    position: absolute;
    bottom: 14px;
  }
}
</style>

<style lang="scss">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
