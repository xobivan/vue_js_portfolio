 <template>
  <div class="social-wrap">
    <ul>
      <li>
        <a :href="links.linkedin" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-linkedin"></font-awesome-icon>
        </a>
      </li>
      <li>
        <a :href="links.github" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-square-github"></font-awesome-icon>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'SocialBar',
        props: ['links'],
    }
</script>

<style scoped lang="scss">
  @import '@/styles/constants.scss';
 .social-wrap {
    li {
      display: inline-block;
      margin-right: 10px;
    }
    .icon {
      font-size: 3rem;
    }
  }
</style>