<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="/static/ultrasonicSmall.png" ></image>
		
		<view class="header-title">{{title}}</view>
		<view class="info">
			<view class="info-item">
				<view >
					<view class="info-item-nubmer">{{data.number}}</view>
					<view class="info-item-title">{{data.name}}</view>
				</view>
			</view>
			<view class="info-item">
				<view class="info-words">
					<image class="info-img" :src="infoImg" mode=""></image>
					<!-- <view class="words-title">编号说明</view>
					<view class="words-explain">
						<image class="arrow" src="../../static/arrow.png" mode=""></image>
						<view >
							<view>（例如 ：1-101）</view>
							<view class="express">
								<view>表示检查诊室号码</view>
								<view>表示第几个检查时间段</view>
								<view>表示检查序号</view>
							</view>
						</view>
					</view>
					<image class="code" src="../../static/testcode.jpg" mode=""></image> -->
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<view class="popup-header">设置</view>
				<view>
					<view class="uni-form-item ">
						<view class="popup-title">标题：</view>
						<input class="uni-input" v-model="title" placeholder="请输入标题" />
					</view>
					<view class="uni-form-item uni-form-btn">
						<view class="popup-title">科室：</view>
						<input class="uni-input" v-model="iType" placeholder="请输入科室" />
					</view>
					<view class="uni-form-item ">
						<view class="popup-title">诊室名：</view>
						<input class="uni-input" v-model="screenNumber"  placeholder="诊室名(例如:诊室一)" />
					</view>
					<view class="uni-form-item uni-form-btn"><button type="default" class="chooseBtn" @click="navTo()">选择页面</button></view>
					
					<view class="uni-form-item ">
						<button class="popup-btn" @click="close">取消</button>
						<button class="popup-btn" @click="confirm">确定</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				dateText: {
					year: '',
					month: '',
					date: '',
					day: '',
					time: ''
				},
				title:'',
				weekday: [],
				data:{
					// room:'科室1',
					// number:'A1002',
					// name:'张无忌',
				},
				cliniqueCode:'',
				iType:'',
				popupShow:false,
				seqNumber:'',
				screenNumber: '',
				playSound:false,
				voiceDataInit:[],
				voiceData:[],
				test:'测试',
				testNubmer:0,
				infoImgFrist:true,
				infoImg:'',
				reload:false,
			}
		},
		onLoad() {
			this.iType = uni.getStorageSync('iType')||'';
			this.screenNumber = uni.getStorageSync('screenNumber') || '';
			this.title = uni.getStorageSync('title') || '';
			if(this.iType){
				this.init();
			}
		},
		methods: {
			//选择页面
			navTo(){
				uni.setStorageSync('pageSetBoolean',false);
				uni.redirectTo({
					url: '../index/index',
				});
			},
			// 打开设置
			open(){
				this.$refs.popup.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.$refs.popup.close();
				this.popupShow = false;
				if(this.iType){
					this.init();
				}
			},
			//确定设置
			confirm(){
				if(this.iType===''){
					uni.showToast({
						title:'请输入科室',
						icon:'none'
					})
					return
				}
				
				uni.showLoading({
					title: '加载中',
				});
				uni.setStorageSync('iType',this.iType);
				uni.setStorageSync('screenNumber', this.screenNumber);
				uni.setStorageSync('title', this.title);
				this.popupShow = false;
				this.init();
				this.$refs.popup.close();
				uni.hideLoading();
			},
			// 初始化数据
			init(){
				if(this.popupShow){
					return false;
				}
				// 测试使用
				// let datas = [{"patientname":"王素霞","LB":"CT","ROOM_NAME":"64排CT","WAIT_STATUS":"4","CALL_TIME1":"16:31:40","patientcode":"2-8","ERNAME":"64排CT","CALL_TIME":"16:31:40"},
				// {"patientname":"吴良付","LB":"EDO","ROOM_NAME":"检查室二","WAIT_STATUS":"6","CALL_TIME1":"15:32:53","patientcode":"14-03","ERNAME":"检查室二","CALL_TIME":"15:32:53"},
				// {"patientname":"田江芬","LB":"EDO","ROOM_NAME":"检查室三","WAIT_STATUS":"4","CALL_TIME1":"16:26:29","patientcode":"16-05","ERNAME":"检查室三","CALL_TIME":"16:26:29"}];
				// datas[0].patientcode = datas[0].patientcode + this.testNubmer++
				
				uni.request({
				    url: 'http://129.1.20.21:8019/Queue/CS_Get_Queue', 
					data:{
						lb :this.iType ,
						room_name_type: this.screenNumber,
					},
				    success: (res) => {
						let datas = res.data.Data;
						if(res.data.reload=='true' && this.reload!=res.data.reload){
							this.$tui.webView.postMessage({
								data: {
									reload:res.data.reload
								}
							})
						}
						this.reload = res.data.reload;
						if(this.infoImgFrist){
							this.infoImgFrist = false;
							this.infoImg = res.data.photos||'../../static/ultrasonicInfo.png';
						}
						if(datas.length>0){
							let name = this.$util.hideName(datas[0].patientname);
							let dataMap = {
								name:name,
								number:datas[0].patientcode,
							}
							this.data = dataMap
						}else{
							this.data = {
								name:'',
								number:'',
							}
						}
						setTimeout(() => {
							this.init();
						}, 5000);
				    },
					fail:(res) => {
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
						setTimeout(() => {
							this.init();
						}, 5000);
					}
				});
			},
		}
	}
</script>

<style>
.pr-15{
	padding-right: 15px;
}
.pl-15{
	padding-left: 15px;
}
page {
	height: 100%;
}
.uni-form-item.uni-form-btn{
	padding: 0;
}

.chooseBtn{
	font-size: 30px;
	width: 438px;
}
.header{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 118px;
}
.room{
	width: 735px;
	margin-left: 50px;
}
.content {
	position: relative;
	height: 100%;
}

.bg {
	position: absolute;
	width: 1080px;
	height: 1920px;
	z-index: -1;
}
.header-time {
	display: flex;
	position: absolute;
	justify-content: center;
	right: 45px;
	padding-top: 15px;
	top: 70px;
}
.header-title{
	color: rgb(253,250,7);
    font-size: 90px;
    letter-spacing: 5px;
    text-align: center;
    height: 123px;
    padding-top: 285px;
}
.header-time view {
	font-size: 38px;
	color: #000;
	letter-spacing:5px;
}
.info{
	margin-left: 35px;
	margin-right: 35px;
}
.info-item{
	height: 587px;
	color: #fff;
	
	
}
.mt-39{
	margin-top: 39px;
}
.mt-15{
	margin-top: 15px;
}
.mt-20{
	margin-top: 20px;
}
.info-item:first-child{
    height: 781px;
	margin-top: 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.info-words{
	padding: 100px 50px 0 50px;
	font-size: 56px;
    letter-spacing: 1px;
    font-weight: 300;
	position: relative;
}
.info-img{
	width: 917px;
	height: 440px;
}
.info-words .words-title{
	letter-spacing: 5px;
}
.words-explain{
	display: flex;
}
.code{
	position: absolute;
	right: 30px;
	top: 70px;
    width: 240px;
    height: 240px;
}
.arrow{
	width: 225px;
	height: 354px;
    padding-top: 5px;
}
.express{
	padding-top: 50px;
}
.info-item-nubmer{
	font-size: 155px;
	text-align: center;
	padding-bottom: 146px;
	padding-bottom: 60px;
}
.info-item-title{
	font-size: 140px;
	text-align: center;
	overflow: hidden;
}
.info-patient {
	display: flex;
	height: 234px;
}
.name{
	width: 735px;
	margin-left: 143px;
}
.info-patient view {
	font-size: 60px;
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.popup-btn{
		font-size: 30px;
		color: #fff;
		padding-left: 40px;
		padding-right: 40px;
		background-color: rgb(68,114,196);
		margin-left: 40px;
		margin-right: 40px;
	}
	.popup{
		background-color: #fff;
		width: 600px;
		font-size: 40px;
		z-index: 100;
	}
	.popup-header{
		background-color: rgb(68,114,196);
		text-align: center;
		padding: 10px 0 ;
	}
	.uni-form-item{
		display: flex;
		align-items: center;
		padding: 40px;
		justify-content: center;
	}
	.popup-title{
		font-size: 30px;
	}
	.uni-input{
		font-size: 25px;
		border: 1px solid;
		padding: 20px 30px;
	}
</style>
