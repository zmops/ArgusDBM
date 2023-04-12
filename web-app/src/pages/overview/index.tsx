import { defineComponent } from 'vue';

import Latest from './compts/latest';
import NumList from './compts/num-list';
import NotClose from './compts/not-close';
import DbStatus from './compts/db-status';
import Apps from './compts/apps';

export default defineComponent({
  name: 'Overview',
  setup() {

    return () => (
      <div class="overflow-y-auto bg-#F0F2F5 pa-base dark:bg-#333">
        <NumList></NumList>
        <a-row >
          <Latest></Latest>
          <NotClose ></NotClose>
        </a-row>
        <a-row >
          <DbStatus></DbStatus>
          <Apps type="mysql" name="离线MySQL" key={'mysql'}></Apps>
        </a-row>
        <a-row >
          <Apps type="postgresql" class="pr-base" name="离线PostgresSQL" key={'postgresql'}></Apps>
          <Apps type="oracle" name="离线Oracle"></Apps>
        </a-row>
      </div>
    );
  },
});
