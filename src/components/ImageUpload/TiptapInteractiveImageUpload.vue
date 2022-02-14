<template>
  <node-view-wrapper
      :class="{ 'vue-component': true, 'inline': node.attrs.inline }"
      data-drag-handle
  >
    <div
        v-if="editMode"
        class="example-full"
    >
      <div
          v-show="$refs.upload && $refs.upload.dropActive"
          class="drop-active"
      >
        <h3>فایل را اینجا رها کنید</h3>
      </div>
      <div class="upload">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th>#</th>
              <th>تصویر</th>
              <th>نام فایل</th>
              <th>عرض</th>
              <th>ارتفاع</th>
              <th>حجم</th>
              <th>سرعت</th>
              <th>وضعیت</th>
              <th>فعالیت</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!files.length">
              <td colspan="9">
                <div class="text-center p-5">
                  <h4>فایل ها را در این قسمت رها کنید</h4>
                </div>
              </td>
            </tr>
            <tr
                v-for="(file, index) in files"
                :key="file.id"
            >
              <td>{{ index }}</td>
              <td>
                <img
                    v-if="file.thumb"
                    class="td-image-thumb"
                    :src="file.thumb"
                >
                <span v-else>No Image</span>
              </td>
              <td>
                <div class="filename">
                  {{ file.name }}
                </div>
                <div
                    v-if="file.active || file.progress !== '0.00'"
                    class="progress"
                >
                  <div
                      :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                      role="progressbar"
                      :style="{width: file.progress + '%'}"
                  >
                    {{ file.progress }}%
                  </div>
                </div>
              </td>
              <td>{{ file.width || 0 }}</td>
              <td>{{ file.height || 0 }}</td>
              <td>{{ formatSize(file.size) }}</td>
              <td>{{ formatSize(file.speed) }}</td>

              <td v-if="file.error">
                {{ file.error }}
              </td>
              <td v-else-if="file.success">
                success
              </td>
              <td v-else-if="file.active">
                active
              </td>
              <td v-else />
              <td>
                <v-btn
                    dark
                    small
                    fab
                    color="red"
                    @click.prevent="$refs.upload.remove(file)"
                >
                  <v-icon dark>
                    mdi-delete-forever
                  </v-icon>
                </v-btn>
                <v-btn
                    v-if="file.response && file.response.url"
                    dark
                    small
                    fab
                    color="blue"
                    @click.prevent="copyImageAddress(file.response.url)"
                >
                  <v-icon dark>
                    mdi-content-copy
                  </v-icon>
                </v-btn>

                <v-btn
                    v-if="node.attrs.url"
                    small
                    dark
                    fab
                    color="green"
                    @click="editMode = false"
                >
                  <v-icon dark>
                    mdi-check
                  </v-icon>
                </v-btn>


                <v-btn
                    v-if="false"
                    dark
                    small
                    fab
                    color="purple"
                    :disabled="file.active || file.success || file.error === 'compressing' || file.error === 'image parsing'"
                    @click.prevent="file.active || file.success || file.error === 'compressing' ? false : onEditFileShow(file)"
                >
                  <v-icon dark>
                    mdi-file-document-edit-outline
                  </v-icon>
                </v-btn>

                <div
                    v-if="false"
                    class="btn-group"
                >
                  <button
                      class="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                  >
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a
                        :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing' || file.error === 'image parsing'}"
                        href="#"
                        @click.prevent="file.active || file.success || file.error === 'compressing' ? false : onEditFileShow(file)"
                    >Edit</a>
                    <a
                        :class="{'dropdown-item': true, disabled: !file.active}"
                        href="#"
                        @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false"
                    >Cancel</a>

                    <a
                        v-if="file.active"
                        class="dropdown-item"
                        href="#"
                        @click.prevent="$refs.upload.update(file, {active: false})"
                    >Abort</a>
                    <a
                        v-else-if="file.error && file.error !== 'compressing' && file.error !== 'image parsing' && $refs.upload.features.html5"
                        class="dropdown-item"
                        href="#"
                        @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})"
                    >Retry upload</a>
                    <a
                        v-else
                        :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing' || file.error === 'image parsing'}"
                        href="#"
                        @click.prevent="file.success || file.error === 'compressing' || file.error === 'image parsing' ? false : $refs.upload.update(file, {active: true})"
                    >Upload</a>

                    <div class="dropdown-divider" />
                    <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="$refs.upload.remove(file)"
                    >Remove</a>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="example-foorer">
          <div
              v-if="false"
              class="footer-status float-right"
          >
            Drop: {{ $refs.upload ? $refs.upload.drop : false }},
            Active: {{ $refs.upload ? $refs.upload.active : false }},
            Uploaded: {{ $refs.upload ? $refs.upload.uploaded : true }},
            Drop active: {{ $refs.upload ? $refs.upload.dropActive : false }}
          </div>
          <file-upload
              ref="upload"
              v-model="files"
              :post-action="postAction"
              :extensions="extensions"
              :accept="accept"
              :multiple="multiple"
              :directory="directory"
              :create-directory="createDirectory"
              :size="size || 0"
              :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
              :headers="headers"
              :data="data"
              :drop="drop"
              :drop-directory="dropDirectory"
              :add-index="addIndex"
              @input-filter="inputFilter"
              @input-file="inputFile"
          >
            <v-btn
                v-if="!node.attrs.url"
                dark
                color="purple"
            >
              یک فایل را انتخاب کنید
            </v-btn>
          </file-upload>
          <v-divider v-if="!node.attrs.url" />
          <v-btn
              v-if="!$refs.upload || !$refs.upload.active && !node.attrs.url"
              dark
              color="purple"
              @click.prevent="$refs.upload.active = true"
          >
            شروع آپلود
          </v-btn>
          <v-btn
              v-else-if="!node.attrs.url"
              dark
              color="purple"
              @click.prevent="$refs.upload.active = false"
          >
            توقف آپلود
          </v-btn>
        </div>
      </div>
      <div
          v-if="false"
          :class="{'modal-backdrop': true, 'fade': true, show: addData.show}"
      />
      <div
          v-if="false"
          id="modal-add-data"
          :class="{modal: true, fade: true, show: addData.show}"
          tabindex="-1"
          role="dialog"
      >
        <div
            class="modal-dialog"
            role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Add data
              </h5>
              <button
                  type="button"
                  class="close"
                  @click.prevent="addData.show = false"
              >
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="onAddData">
              <div class="modal-body">
                <div class="form-group">
                  <label for="data-name">Name:</label>
                  <input
                      id="data-name"
                      v-model="addData.name"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Please enter a file name"
                  >
                  <small class="form-text text-muted">Such as <code>filename.txt</code></small>
                </div>
                <div class="form-group">
                  <label for="data-type">Type:</label>
                  <input
                      id="data-type"
                      v-model="addData.type"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Please enter the MIME type"
                  >
                  <small class="form-text text-muted">Such as <code>text/plain</code></small>
                </div>
                <div class="form-group">
                  <label for="content">Content:</label>
                  <textarea
                      id="content"
                      v-model="addData.content"
                      class="form-control"
                      required
                      rows="3"
                      placeholder="Please enter the file contents"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    @click.prevent="addData.show = false"
                >
                  Close
                </button>
                <button
                    type="submit"
                    class="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
          v-if="false"
          :class="{'modal-backdrop': true, 'fade': true, show: editFile.show}"
      />
      <div
          v-if="false"
          id="modal-edit-file"
          :class="{modal: true, fade: true, show: editFile.show}"
          tabindex="-1"
          role="dialog"
      >
        <div
            class="modal-dialog modal-lg"
            role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Edit file
              </h5>
              <button
                  type="button"
                  class="close"
                  @click.prevent="editFile.show = false"
              >
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="onEditorFile">
              <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input
                      id="name"
                      v-model="editFile.name"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Please enter a file name"
                  >
                </div>
                <div
                    v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'"
                    class="form-group"
                >
                  <label>Image: </label>
                  <div class="edit-image">
                    <img
                        ref="editImage"
                        :src="editFile.blob"
                    >
                  </div>

                  <div class="edit-image-tool">
                    <div
                        class="btn-group"
                        role="group"
                    >
                      <button
                          type="button"
                          class="btn btn-primary"
                          title="cropper.rotate(-90)"
                          @click="editFile.cropper.rotate(-90)"
                      >
                        <i
                            class="fa fa-undo"
                            aria-hidden="true"
                        />
                      </button>
                      <button
                          type="button"
                          class="btn btn-primary"
                          title="cropper.rotate(90)"
                          @click="editFile.cropper.rotate(90)"
                      >
                        <i
                            class="fa fa-repeat"
                            aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div
                        class="btn-group"
                        role="group"
                    >
                      <button
                          type="button"
                          class="btn btn-primary"
                          title="cropper.crop()"
                          @click="editFile.cropper.crop()"
                      >
                        <i
                            class="fa fa-check"
                            aria-hidden="true"
                        />
                      </button>
                      <button
                          type="button"
                          class="btn btn-primary"
                          title="cropper.clear()"
                          @click="editFile.cropper.clear()"
                      >
                        <i
                            class="fa fa-remove"
                            aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    @click.prevent="editFile.show = false"
                >
                  Close
                </button>
                <button
                    type="submit"
                    class="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <v-hover
        v-slot="{ hover }"
        class="image-parent"
        :style="{ marginBottom: vertical + 'px' }"
    >
      <div
          ref="resizer"
          :style="{ width: '100%', height: editMode ? 0 + 'px' : node.attrs.height + 'px', position: 'relative' }"
          :class="{ 'center': node.attrs.justify === 'center', 'image': true }"
      >
        <VueDragResize
            v-if="!editMode"
            :sticks="['br']"
            :aspect-ratio="true"
            :x="left"
            :y="top"
            :is-active="true"
            :is-draggable="node.attrs.inline"
            :w="width"
            :h="height"
            :minw="20"
            :minh="20"
            :parent-w="$refs.resizer.clientWidth * 2"
            :parent-h="node.attrs.inline ? height * 2 : 800"
            :parent-limitation="true"
            @resizestop="resize"
            @dragstop="dragstop"
        >
          <img
              :src="node.attrs.url"
              width="100%"
          >
        </VueDragResize>
        <v-btn-toggle
            v-if="hover && !node.attrs.inline"
            v-model="toggleJustify"
            class="toggle-justify"
        >
          <v-btn
              value="right"
              @click="setJustify('right')"
          >
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>

          <v-btn
              value="center"
              @click="setJustify('center')"
          >
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn
              value="left"
              @click="setJustify('left')"
          >
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-hover>
  </node-view-wrapper>
</template>

<script>

import FileUpload from 'vue-upload-component'
import ImageCompressor from '@xkeshi/image-compressor'
import Cropper from 'cropperjs'
import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'
import MixinComponentImageUpload from 'vue-tiptap-katex-core/components/ImageUpload/mixin'


Vue.component('vue-drag-resize', VueDragResize)


export default {
  mixins: [MixinComponentImageUpload],
  components: {
    FileUpload,
    NodeViewWrapper,
    VueDragResize
  },
}
</script>

<style scoped>
.toggle-justify {
  position: absolute;
  left: 10px;
  top: -40px;
  opacity: 0.47;
}

.center {
  display: flex !important;
  justify-content: center !important;
}

.center .vdr {
  position: relative !important;
  left: 0 !important;
}

.inline {
  display: inline-block;
}

.inline .image-parent,
.inline .image {
  width: max-content;
  padding: 0 10px;
}

.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all .2s
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}
.example-full label.dropdown-item {
  margin-bottom: 0;
}
.example-full .btn-group .dropdown-toggle {
  margin-right: .6rem
}
.td-image-thumb {
  max-width: 4em;
  max-height: 4em;
}
.example-full .filename {
  margin-bottom: .3rem
}
.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: .5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}
.example-full .edit-image img {
  max-width: 100%;
}
.example-full .edit-image-tool {
  margin-top: .6rem;
}
.example-full .edit-image-tool .btn-group{
  margin-right: .6rem;
}
.example-full .footer-status {
  padding-top: .4rem;
}
.example-full .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-full .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}

.example-full .upload th {
  text-align: center !important;
  line-height: 48px;
}
</style>
