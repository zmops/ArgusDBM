<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <notice class="right-menu-item"/>
      <template v-if="device!=='mobile'">

        <lang-select class="right-menu-item hover-effect" />

      </template>
      
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon iconClass="avater" class="user-avatar"></svg-icon>
          <div class="avator-name">{{ name }}</div>
          <i class="el-icon-caret-bottom"/>
        </div>

        <el-dropdown-menu slot="dropdown">
          <!--          <router-link to="/mine/setting">-->
          <!--            <el-dropdown-item>我的设置</el-dropdown-item>-->
          <!--          </router-link>-->

          <el-dropdown-item>
            <span @click="dialogVisible = true">{{ $t('navbar.securitySetting') }}</span>
          </el-dropdown-item>
          <a :href="wordUrl" target="_blank">
            <el-dropdown-item>{{ $t('navbar.docs') }}</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Notice from '@/components/Notice'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search,
    Notice
  },
  data(){
    return {
    wordUrl:''
  }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #ccd2d8;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .auth {
      position: absolute;
      top: 0;
      right: 630px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      // height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      background-color: #fff;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }

      .el-alert {
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        margin: 9px 0;
      }

      .el-alert--warning.is-light {
        background: rgba(243, 243, 243, 1);
        color: rgba(174, 70, 70, 1);
      }
    }

    .download {
      display: inline-block;
      background: #eef1f7;
      border: 1px solid #c6ccd3;
      border-radius: 14px;
      padding: 7px 12px;
      line-height: 14px;
      font-size: 14px;
      color: #2178b3;
      cursor: pointer;
    }

    .download:hover {
      background: #03a9e5;
      color: #ffffff;
      border: 1px solid #3d7edb;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: inline-block;
          vertical-align: middle;
        }

        .avator-name {
          display: inline-block;
          line-height: 48px;
          font-size: 14px;
          padding-left: 5px;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
        }
      }
    }
  }

  .right-time-select {
    vertical-align: top;
    margin-top: 11px;
    font-size: 12px;
    width: 300px;
    background: #f8f7f7;
    border-radius: 4px;
    border: 1 pxs solid #fff;
    display: none !important;

    &.show {
      display: inline-flex !important;
    }

    & ::v-deep input {
      background: #f8f7f7;
      width: 45%;
      cursor: pointer;
    }

    & ::v-deep .el-range__close-icon {
      display: none;
    }
  }
}
</style>
