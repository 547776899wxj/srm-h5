<template>
	<view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<view class="popup-header">设置</view>
				<view>
					<view class="uni-form-item " v-if="showTitle">
						<view class="popup-title" >标题：</view>
						<input class="uni-input" v-model="dataInit.title" placeholder="请输入标题" />
					</view>
					<view class="uni-form-item " v-if="showIType">
						<view class="popup-title" >{{iTypeText}}：</view>
						<input class="uni-input" v-model="dataInit.iType" placeholder="请输入编号" />
					</view>
					<view class="uni-form-item " v-if="showScreenNumber">
						<view class="popup-title">屏幕：</view>
						<input class="uni-input" v-model="dataInit.screenNumber" type="number" placeholder="第一个屏幕输入:1" />
					</view>
					<view class="uni-form-item" v-if="showPlaySound">
						<view class="popup-title">声音：</view>
						<radio-group @change="radioChange" class="radio-group">
							<label class="uni-list-cell uni-list-cell-pd">
							    <view>
							        <radio class="radio" value="false"  :checked="dataInit.playSound==false"/>
							    </view>
							    <view class="popup-title">无</view>
							</label>
						    <label class="uni-list-cell uni-list-cell-pd">
						        <view>
						            <radio class="radio" value="true" :checked="dataInit.playSound==true" />
						        </view>
						        <view class="popup-title">有</view>
						    </label>
						</radio-group>
					</view>
					<view class="uni-form-item" v-if="showChoseLine">
						<view class="popup-title">科室：</view>
						<radio-group @change="radioChangeLine" class="radio-group" style="font-size: 30px;flex-wrap: wrap;width: 380px;">
							<label class="uni-list-cell uni-list-cell-pd" :style="{width:index%2==0?'183px':'auto'}"  v-for="(item, index) in items" :key="index">
								<view>
									<radio class="line-radio" :value="item.value" :checked="item.value == dataInit.lineNumber" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
					<view class="uni-form-item "><button type="default" class="chooseBtn" @click="navTo()">设置ip</button></view>

					<view class="uni-form-item form-item-bottom">
						<button class="popup-btn" @click="close">取消</button>
						<button class="popup-btn" @click="confirm">确定</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import popup from '../uni-popup/uni-popup.vue';
export default {
	name: 'popupSet',
	data() {
		return {
			items: [
				{name:'耳鼻喉',value:'ebh'},
				{name:'内科',value:'nk'},
				{name:'骨伤科',value:'gsk'},
				{name:'普外科',value:'pwk'},
				{name:'疾病代谢',value:'jbdx'},
				{name:'肛肠科',value:'gck'},
				{name:'男科',value:'andrology'},
				{name:'针灸推拿',value:'zjtn'},
				{name:'产科',value:'ck'},
				{name:'老专家',value:'lzj'},
			],
		};
	},
	props: {
		//数据
		dataInit:{
			type: Object,
			default: function(e) {
				return  {
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
					lineNumber:'ebh',
				}
			}
		},
		iTypeText:{
			type:String,
			default:'诊室'
		},
		//标题
		showTitle: {
			type: Boolean,
			default: false
		},
		//搜索条件
		showIType:{
			type: Boolean,
			default: false
		},
		// 屏幕
		showScreenNumber:{
			type: Boolean,
			default: false
		},
		// 声音
		showPlaySound:{
			type: Boolean,
			default: false
		},
		// 声音
		showChoseLine:{
			type: Boolean,
			default: false
		}
	},
	methods:{
		// 打开设置
		open(){
			this.$refs.popup.open();
		},
		// 关闭设置
		close(){
			this.$refs.popup.close();
			this.$emit("close",false);
		},
		//确定设置
		confirm(){
			uni.showLoading({
				title: '加载中',
			});
			uni.setStorageSync('iType',this.dataInit.iType);
			uni.setStorageSync('screenNumber', this.dataInit.screenNumber);
			uni.setStorageSync('title', this.dataInit.title);
			uni.setStorageSync('playSound', this.dataInit.playSound);
			uni.setStorageSync('lineNumber', this.dataInit.lineNumber);
			this.$refs.popup.close();
			
			this.$emit('confirm',this.dataInit)
			uni.hideLoading();
		},
		navTo(){
			uni.setStorageSync('pageSetBoolean',false);
			this.$tui.webView.redirectTo({
				url: '../index/index?webView=true',
			})
			
		},
		//声音设置
		radioChange(evt) {
			if(evt.target.value=='true'){
				this.dataInit.playSound = true;
			}else{
				this.dataInit.playSound = false;
			}
		},
		radioChangeLine(evt) {
			this.dataInit.lineNumber = evt.target.value;
		},
	}
};
</script>

<style>
.popup-btn {
	font-size: 30px;
	color: #fff;
	padding-left: 40px;
	padding-right: 40px;
	background-color: rgb(68, 114, 196);
	margin-left: 40px;
	margin-right: 40px;
}
.popup {
	background-color: #fff;
	width: 600px;
	font-size: 40px;
	z-index: 100;
}
.popup-header {
	background-color: rgb(68, 114, 196);
	text-align: center;
	padding: 10px 0;
}
.uni-form-item {
	display: flex;
	align-items: center;
	padding: 40px 40px 0 40px;
	justify-content: center;
}
.popup-title {
	font-size: 30px;
}
.uni-input {
	font-size: 25px;
	border: 1px solid;
	padding: 20px 30px;
}
.uni-form-item.form-item-bottom{
	padding-bottom: 40px;
}
.chooseBtn{
	font-size: 30px;
	width: 438px;
}
.radio-group{
	width: 360px;
	display: flex;
}
.uni-list-cell{
	display: flex;
	align-items: center;
}
.radio{
	transform:scale(2);
	width: 48px;
	height: 48px;
	margin-right: 30px;
	display: flex;
	justify-content: center;
	    margin-left: 30px;
}
.line-radio{
	transform:scale(1.5);
	margin-right: 17px;
	display: flex;
	justify-content: center;
	margin-left: 17px;
	
}
</style>
