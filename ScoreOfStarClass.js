/**
 * Created by Administrator on 2016/11/18.
 */
/****** 评分 星星 类 ******/

;( function($){

    var ScoreOfStarClass = function ( starNum, hadSelect, canEdit ){// 星星个数、已选择星星数、评分类型（可修改/不可修改）

        this.starNum = starNum;
        this.hadSelect = hadSelect;
        this.canEdit = canEdit;

        // 生成 html，保存的是jq对象
        this.$star = this.createStarHtml();
        this.$score = this.createScoreHtml();

        if( this.canEdit ){ // 可修改

            this.$star.each( function(){
                $(this).css('cursor', 'pointer');// 手指
            });

            this.starHover();
            this.starClick();
        }
    };

    // 生成星星 html，返回jq对象
    ScoreOfStarClass.prototype.createStarHtml = function(){

        var _str = ''
        for( var i=0; i < this.starNum; i ++ ){

            if( i < this.hadSelect ){
                _str += '<i class="fa fa-star"></i>';
            }else{
                _str += '<i class="fa fa-star-o"></i>';
            }
        }
        return $(_str);
    };

    // 生成分数 html，返回jq对象
    ScoreOfStarClass.prototype.createScoreHtml = function(){
        var _str = '<span style="margin-left: 0.5rem;">' + this.hadSelect + '分</span>';
        return $( _str );
    };

    // 鼠标滑过星星 事件
    ScoreOfStarClass.prototype.starHover = function(){

        if( !this.canEdit ) return;

        var $starArr = this.$star;
        var _self = this;

        $starArr.each( function( index ){

            $(this).hover(function(){

                // 星星
                $(this).removeClass('fa-star-o').addClass('fa-star');// 当前鼠标指向的星星 选中状态
                $(this).prevAll('i').removeClass('fa-star-o').addClass('fa-star');// 当前鼠标指向的星星 前面选中状态
                $(this).nextAll('i').removeClass('fa-star').addClass('fa-star-o');// 当前鼠标指向的星星 后面非选中状态

                // 分数 文本
                _self.$score.text( (index+1) + '分' );// “分数”文本

            },function(){

                // 星星
                if( $starArr.length == _self.hadSelect ){// 全选
                    $starArr.removeClass('fa-star-o').addClass('fa-star');// 选中状态

                }else{
                    $starArr.removeClass('fa-star').addClass('fa-star-o');// 非选中状态
                    $starArr.eq( _self.hadSelect ).prevAll('i').removeClass('fa-star-o').addClass('fa-star');// 选中状态
                }

                // 分数 文本
                _self.$score.text( _self.hadSelect + '分' );// “分数”文本
            })

        });
    };

    // 鼠标点击星星 事件
    ScoreOfStarClass.prototype.starClick = function(){

        if( !this.canEdit ) return;

        var $starArr = this.$star;
        var _self = this;

        $starArr.each( function( index ){

            $(this).click(function(){

                _self.hadSelect = index + 1;// 已选择的星星数
            });
        });
    };

    // 获取得分
    ScoreOfStarClass.prototype.getScore = function(){
        return this.hadSelect;
    };

    $.ScoreOfStarClass = ScoreOfStarClass; // 添加到 jQuery

})( jQuery );
